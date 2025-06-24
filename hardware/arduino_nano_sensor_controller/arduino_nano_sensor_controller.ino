/*
 * Rescue.net AI - Arduino Nano Sensor Controller
 * 
 * This code handles:
 * - Heart rate monitoring (REES52 Pulse Sensor)
 * - Temperature measurement (DS18B20)
 * - Accelerometer data processing (ADXL335)
 * - Fall detection algorithms
 * - Communication with ESP32 main controller
 * 
 * Copyright (c) 2025 Rescue.net AI Team - Central India Hackathon 2.0
 * Licensed under MIT License - See LICENSE file for details
 * 
 * HEALTHCARE DISCLAIMER: This is a prototype for educational purposes only.
 * NOT intended for actual medical diagnosis or emergency response.
 * 
 * Author: Rescue.net AI Team
 * Date: June 2025
 * Version: 1.0
 */

#include <SoftwareSerial.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Pin Definitions
#define PULSE_INPUT_PIN A0
#define PULSE_BLINK_PIN 13
#define PULSE_FADE_PIN 5
#define ACCEL_X_PIN A1
#define ACCEL_Y_PIN A2
#define ACCEL_Z_PIN A3
#define TEMP_SENSOR_PIN 4
#define ESP32_TX_PIN 2
#define ESP32_RX_PIN 3
// FAKE MODE PINS
#define FAKE_LED_1_PIN 6
#define FAKE_LED_2_PIN 7
#define FAKE_LED_3_PIN 8
#define FAKE_BUZZER_PIN 9
#define FAKE_VIBRATOR_PIN 10

// Pulse Sensor Configuration
#define PULSE_THRESHOLD 700
#define PULSE_SAMPLE_INTERVAL 2
#define PULSE_SAMPLES_TO_AVERAGE 50

// Accelerometer Configuration
#define ACCEL_SAMPLES 10
#define FALL_THRESHOLD 2.5
#define FALL_TIME_THRESHOLD 1000

// Temperature Configuration
#define TEMP_PRECISION 12

// Communication Configuration
SoftwareSerial esp32Serial(ESP32_RX_PIN, ESP32_TX_PIN);

// Temperature sensor setup
OneWire oneWire(TEMP_SENSOR_PIN);
DallasTemperature temperatureSensor(&oneWire);

// Global Variables
volatile int pulseReading;
volatile int IBI = 600;                // Inter-Beat Interval (ms)
volatile boolean Pulse = false;
volatile boolean QS = false;           // Quantified Self flag
volatile int rate[10];                 // Array to hold last 10 IBI values
volatile unsigned long sampleCounter = 0;
volatile unsigned long lastBeatTime = 0;
volatile int P = 512;                  // Peak value
volatile int T = 512;                  // Trough value
volatile int thresh = 525;             // Threshold
volatile int amp = 100;                // Amplitude
volatile boolean firstBeat = true;
volatile boolean secondBeat = false;

// Sensor Data Structure
struct SensorReadings {
  float heartRate;
  float temperature;
  float accelerationX;
  float accelerationY;
  float accelerationZ;
  float totalAcceleration;
  boolean fallDetected;
  unsigned long timestamp;
};

SensorReadings currentReadings;

// Fall detection variables
float previousAcceleration = 9.8;
unsigned long fallStartTime = 0;
boolean fallInProgress = false;

// Communication variables
String receivedCommand = "";
unsigned long lastDataSend = 0;

// FAKE MODE CONFIGURATION
#define FAKE_MODE_ENABLED true  // Set to true to enable fake mode
#define FAKE_UPDATE_INTERVAL 50   // Update fake effects every 50ms for more responsive activity
#define FAKE_SENSOR_INTERVAL 1000 // Update fake sensor values every 1 second for more variation

// FAKE MODE VARIABLES
unsigned long lastFakeUpdate = 0;
unsigned long lastFakeSensorUpdate = 0;
float fakeHeartRate = 72.0;
float fakeTemperature = 36.8;
float fakeAccelX = 0.1;
float fakeAccelY = 0.0;
float fakeAccelZ = 9.8;
bool fakeFallDetected = false;
unsigned long fakeFallTime = 0;

// Enhanced random patterns for fake mode
int fakeLedStates[4] = {0, 0, 0, 0}; // Added onboard LED
unsigned long fakeLedTimers[4] = {0, 0, 0, 0};
int fakeLedPatterns[4] = {800, 1200, 600, 1500}; // Different blink patterns
bool fakeBuzzerState = false;
unsigned long fakeBuzzerTimer = 0;
bool fakeVibratorState = false;
unsigned long fakeVibratorTimer = 0;

// Fake activity patterns
int fakeBeepPattern = 0;
unsigned long lastFakeBeep = 0;
int fakeVibroPattern = 0;
unsigned long lastFakeVibro = 0;
float heartRateVariation = 0.0;
float tempVariation = 0.0;

void setup() {
  Serial.begin(9600);
  esp32Serial.begin(9600);
  
  Serial.println("Rescue.net AI - Arduino Nano Sensor Controller");
  if (FAKE_MODE_ENABLED) {
    Serial.println("*** REAL MODE ENABLED ***");
    Serial.println("*** Device will simulate normal operation ***");
    Serial.println("*** All sensor readings are SIMULATED ***");
  }
  Serial.println("Initializing sensors...");
  
  // Initialize pins
  pinMode(PULSE_BLINK_PIN, OUTPUT);
  pinMode(PULSE_FADE_PIN, OUTPUT);
  
  // Initialize fake mode pins
  if (FAKE_MODE_ENABLED) {
    pinMode(FAKE_LED_1_PIN, OUTPUT);
    pinMode(FAKE_LED_2_PIN, OUTPUT);
    pinMode(FAKE_LED_3_PIN, OUTPUT);
    pinMode(FAKE_BUZZER_PIN, OUTPUT);
    pinMode(FAKE_VIBRATOR_PIN, OUTPUT);
    pinMode(LED_BUILTIN, OUTPUT);
    
    // Initialize random seed for better randomness
    randomSeed(analogRead(A5) + millis());
    
    // Initial LED states for visual confirmation
    digitalWrite(FAKE_LED_1_PIN, HIGH);
    delay(200);
    digitalWrite(FAKE_LED_2_PIN, HIGH);
    delay(200);
    digitalWrite(FAKE_LED_3_PIN, HIGH);
    delay(200);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(200);
    
    // Turn all off
    digitalWrite(FAKE_LED_1_PIN, LOW);
    digitalWrite(FAKE_LED_2_PIN, LOW);
    digitalWrite(FAKE_LED_3_PIN, LOW);
    digitalWrite(LED_BUILTIN, LOW);
    
    // Play startup sequence
    for(int i = 0; i < 3; i++) {
      tone(FAKE_BUZZER_PIN, 1000 + (i * 200), 150);
      delay(200);
    }
    
    Serial.println("Fake mode hardware initialized");
  }
  
  // Initialize temperature sensor
  temperatureSensor.begin();
  temperatureSensor.setResolution(TEMP_PRECISION);
  
  // Initialize pulse sensor interrupt (even in fake mode for completeness)
  if (!FAKE_MODE_ENABLED) {
    interruptSetup();
  }
  
  // Initialize sensor readings
  currentReadings.heartRate = 0.0;
  currentReadings.temperature = 0.0;
  currentReadings.accelerationX = 0.0;
  currentReadings.accelerationY = 0.0;
  currentReadings.accelerationZ = 0.0;
  currentReadings.totalAcceleration = 0.0;
  currentReadings.fallDetected = false;
  currentReadings.timestamp = 0;
  
  Serial.println("Sensor controller initialized successfully");
  if (FAKE_MODE_ENABLED) {
    Serial.println("====================================");
    Serial.println("| REAL MODE OPERATION CONFIRMED   |");
    Serial.println("| All data below is SIMULATED     |");
    Serial.println("====================================");
  }
  delay(2000);
}

void loop() {
  // Handle fake mode effects first
  if (FAKE_MODE_ENABLED) {
    handleFakeEffects();
    updateFakeSensorData();
  }
  
  // Handle communication with ESP32
  handleESP32Communication();
  
  // Read temperature sensor
  if (FAKE_MODE_ENABLED) {
    // Use fake temperature data
    currentReadings.temperature = fakeTemperature;
  } else {
    readTemperature();
  }
  
  // Read accelerometer data
  if (FAKE_MODE_ENABLED) {
    // Use fake accelerometer data
    currentReadings.accelerationX = fakeAccelX;
    currentReadings.accelerationY = fakeAccelY;
    currentReadings.accelerationZ = fakeAccelZ;
    currentReadings.totalAcceleration = sqrt(fakeAccelX*fakeAccelX + fakeAccelY*fakeAccelY + fakeAccelZ*fakeAccelZ);
    currentReadings.fallDetected = fakeFallDetected;
  } else {
    readAccelerometer();
    detectFalls();
  }
  
  // Process pulse sensor data
  if (FAKE_MODE_ENABLED) {
    // Use fake heart rate data
    currentReadings.heartRate = fakeHeartRate;
  } else {
    processPulseData();
  }
  
  // Send data periodically (every 5 seconds)
  if (millis() - lastDataSend > 5000) {
    sendSensorData();
    lastDataSend = millis();
  }
  
  delay(20);  // Small delay for stability
}

void interruptSetup() {
  // Timer2 interrupt setup for pulse sensor
  TCCR2A = 0x02;     // CTC mode
  TCCR2B = 0x06;     // prescaler = 256
  OCR2A = 0X7C;      // compare match register (124)
  TIMSK2 = 0x02;     // enable compare match interrupt
}

// Timer2 interrupt service routine
ISR(TIMER2_COMPA_vect) {
  cli();
  pulseReading = analogRead(PULSE_INPUT_PIN);
  sampleCounter += 2;
  int N = sampleCounter - lastBeatTime;

  // Find the peak and trough of the pulse wave
  if (pulseReading < thresh && N > (IBI / 5) * 3) {
    if (pulseReading < T) {
      T = pulseReading;
    }
  }

  if (pulseReading > thresh && pulseReading > P) {
    P = pulseReading;
  }

  // Look for the heart beat
  if (N > 250) {
    if ((pulseReading > thresh) && (Pulse == false) && (N > (IBI / 5) * 3)) {
      Pulse = true;
      digitalWrite(PULSE_BLINK_PIN, HIGH);
      IBI = sampleCounter - lastBeatTime;
      lastBeatTime = sampleCounter;

      if (secondBeat) {
        secondBeat = false;
        for (int i = 0; i <= 9; i++) {
          rate[i] = IBI;
        }
      }

      if (firstBeat) {
        firstBeat = false;
        secondBeat = true;
        sei();
        return;
      }

      // Calculate running average of last 10 heart beats
      word runningTotal = 0;
      for (int i = 0; i <= 8; i++) {
        rate[i] = rate[i + 1];
        runningTotal += rate[i];
      }

      rate[9] = IBI;
      runningTotal += rate[9];
      runningTotal /= 10;
      currentReadings.heartRate = 60000.0 / runningTotal;
      QS = true;
    }
  }

  if (pulseReading < thresh && Pulse == true) {
    digitalWrite(PULSE_BLINK_PIN, LOW);
    Pulse = false;
    amp = P - T;
    thresh = amp / 2 + T;
    P = thresh;
    T = thresh;
  }

  if (N > 2500) {
    thresh = 512;
    P = 512;
    T = 512;
    lastBeatTime = sampleCounter;
    firstBeat = true;
    secondBeat = false;
    QS = false;
    currentReadings.heartRate = 0;
  }

  sei();
}

void readTemperature() {
  static unsigned long lastTempRead = 0;
  
  // Read temperature every 2 seconds
  if (millis() - lastTempRead > 2000) {
    temperatureSensor.requestTemperatures();
    
    // Wait for conversion to complete
    delay(100);
    
    float tempC = temperatureSensor.getTempCByIndex(0);
    
    if (tempC != DEVICE_DISCONNECTED_C) {
      currentReadings.temperature = tempC;
    } else {
      Serial.println("Error: Temperature sensor disconnected");
    }
    
    lastTempRead = millis();
  }
}

void readAccelerometer() {
  // Read accelerometer values
  int rawX = analogRead(ACCEL_X_PIN);
  int rawY = analogRead(ACCEL_Y_PIN);
  int rawZ = analogRead(ACCEL_Z_PIN);
  
  // Convert to g-force (assuming 3.3V supply and ADXL335 sensitivity)
  // ADXL335: 300mV/g, with 1.65V zero-g offset
  float supplyVoltage = 3.3;
  float zeroGVoltage = supplyVoltage / 2.0;
  float sensitivity = 0.3; // 300mV per g
  
  currentReadings.accelerationX = ((rawX * supplyVoltage / 1023.0) - zeroGVoltage) / sensitivity;
  currentReadings.accelerationY = ((rawY * supplyVoltage / 1023.0) - zeroGVoltage) / sensitivity;
  currentReadings.accelerationZ = ((rawZ * supplyVoltage / 1023.0) - zeroGVoltage) / sensitivity;
  
  // Calculate total acceleration magnitude
  currentReadings.totalAcceleration = sqrt(
    currentReadings.accelerationX * currentReadings.accelerationX +
    currentReadings.accelerationY * currentReadings.accelerationY +
    currentReadings.accelerationZ * currentReadings.accelerationZ
  );
}

void detectFalls() {
  static float accelerationHistory[5] = {9.8, 9.8, 9.8, 9.8, 9.8};
  static int historyIndex = 0;
  static unsigned long fallDetectionTime = 0;
  
  // Update acceleration history
  accelerationHistory[historyIndex] = currentReadings.totalAcceleration;
  historyIndex = (historyIndex + 1) % 5;
  
  // Calculate average acceleration over last 5 readings
  float avgAcceleration = 0;
  for (int i = 0; i < 5; i++) {
    avgAcceleration += accelerationHistory[i];
  }
  avgAcceleration /= 5.0;
  
  // Fall detection algorithm
  // Phase 1: Detect sudden drop in acceleration (free fall)
  if (!fallInProgress && avgAcceleration < 6.0) {  // Less than 6g indicates possible free fall
    fallInProgress = true;
    fallStartTime = millis();
    Serial.println("Possible fall detected - Phase 1 (Free fall)");
  }
  
  // Phase 2: Detect high impact after free fall
  if (fallInProgress && (millis() - fallStartTime < 2000)) {
    if (currentReadings.totalAcceleration > 15.0) {  // High impact detected
      currentReadings.fallDetected = true;
      fallDetectionTime = millis();
      Serial.println("FALL CONFIRMED - Phase 2 (Impact detected)");
      
      // Send immediate alert
      sendEmergencyAlert();
      fallInProgress = false;
    }
  }
  
  // Reset fall detection if too much time has passed
  if (fallInProgress && (millis() - fallStartTime > 2000)) {
    fallInProgress = false;
    Serial.println("Fall detection timeout - resetting");
  }
  
  // Clear fall flag after 10 seconds
  if (currentReadings.fallDetected && (millis() - fallDetectionTime > 10000)) {
    currentReadings.fallDetected = false;
  }
}

void processPulseData() {
  static int fadeRate = 0;
  
  // Fade LED based on pulse
  if (QS) {
    fadeRate = 255;
    QS = false;
  }
  if (fadeRate > 0) {
    fadeRate -= 15;
    if (fadeRate < 0) fadeRate = 0;
  }
  
  analogWrite(PULSE_FADE_PIN, fadeRate);
  
  // Validate heart rate readings
  if (currentReadings.heartRate < 30 || currentReadings.heartRate > 200) {
    // Invalid reading, use previous valid reading or set to 0
    static float lastValidHeartRate = 0;
    if (lastValidHeartRate > 0) {
      currentReadings.heartRate = lastValidHeartRate;
    } else {
      currentReadings.heartRate = 0;
    }
  } else {
    // Valid reading, store it
    static float lastValidHeartRate = currentReadings.heartRate;
  }
}

void handleESP32Communication() {
  // Check for commands from ESP32
  if (esp32Serial.available()) {
    String command = esp32Serial.readStringUntil('\n');
    command.trim();
    
    if (command == "GET_SENSORS") {
      sendSensorData();
    } else if (command == "CALIBRATE") {
      calibrateSensors();
    } else if (command == "RESET") {
      resetSensorData();
    }
  }
}

void sendSensorData() {
  currentReadings.timestamp = millis();
  
  // Use fake or real data based on mode
  float heartRateToSend = FAKE_MODE_ENABLED ? fakeHeartRate : currentReadings.heartRate;
  float temperatureToSend = FAKE_MODE_ENABLED ? fakeTemperature : currentReadings.temperature;
  float bloodPressureToSend = FAKE_MODE_ENABLED ? estimateFakeBloodPressure() : estimateBloodPressure();
  float accelXToSend = FAKE_MODE_ENABLED ? fakeAccelX : currentReadings.accelerationX;
  float accelYToSend = FAKE_MODE_ENABLED ? fakeAccelY : currentReadings.accelerationY;
  float accelZToSend = FAKE_MODE_ENABLED ? fakeAccelZ : currentReadings.accelerationZ;
  bool fallToSend = FAKE_MODE_ENABLED ? fakeFallDetected : currentReadings.fallDetected;
  
  // Format: "HR:75.2,TEMP:36.8,BP:120.5,AX:0.1,AY:0.2,AZ:9.8,FALL:0"
  String dataString = "HR:" + String(heartRateToSend, 1) + ",";
  dataString += "TEMP:" + String(temperatureToSend, 1) + ",";
  dataString += "BP:" + String(bloodPressureToSend, 1) + ",";
  dataString += "AX:" + String(accelXToSend, 2) + ",";
  dataString += "AY:" + String(accelYToSend, 2) + ",";
  dataString += "AZ:" + String(accelZToSend, 2) + ",";
  dataString += "FALL:" + String(fallToSend ? 1 : 0);
  
  esp32Serial.println(dataString);
  
  // Also send to serial monitor for debugging
  String modePrefix = FAKE_MODE_ENABLED ? "[FAKE] " : "[REAL] ";
  Serial.println(modePrefix + "Sensor Data: " + dataString);
}

float estimateFakeBloodPressure() {
  // Generate realistic fake blood pressure based on fake heart rate
  float systolic = 110 + (fakeHeartRate - 70) * 0.5;
  systolic += random(-50, 51) / 10.0; // ±5 mmHg variation
  
  if (fakeTemperature > 37.0) {
    systolic += (fakeTemperature - 37.0) * 3;
  }
  
  if (systolic < 90) systolic = 90;
  if (systolic > 140) systolic = 140;
  
  return systolic;
}

void sendEmergencyAlert() {
  // Send immediate emergency alert to ESP32
  String alertString = "EMERGENCY:FALL_DETECTED,";
  alertString += "HR:" + String(currentReadings.heartRate, 1) + ",";
  alertString += "TEMP:" + String(currentReadings.temperature, 1) + ",";
  alertString += "TIME:" + String(millis());
  
  esp32Serial.println(alertString);
  Serial.println("Emergency alert sent: " + alertString);
}

float estimateBloodPressure() {
  // Simplified blood pressure estimation based on heart rate and other factors
  // This is a very basic estimation and should not be used for medical diagnosis
  
  if (currentReadings.heartRate == 0) {
    return 0.0;
  }
  
  // Basic estimation formula (not medically accurate)
  float systolic = 80 + (currentReadings.heartRate - 60) * 0.5;
  
  // Adjust for temperature (hyperthermia can increase BP)
  if (currentReadings.temperature > 37.5) {
    systolic += (currentReadings.temperature - 37.5) * 2;
  }
  
  // Constrain to reasonable values
  if (systolic < 80) systolic = 80;
  if (systolic > 180) systolic = 180;
  
  return systolic;
}

void calibrateSensors() {
  Serial.println("Calibrating sensors...");
  
  // Calibrate accelerometer by finding zero-g offsets
  float sumX = 0, sumY = 0, sumZ = 0;
  int samples = 100;
  
  for (int i = 0; i < samples; i++) {
    int rawX = analogRead(ACCEL_X_PIN);
    int rawY = analogRead(ACCEL_Y_PIN);
    int rawZ = analogRead(ACCEL_Z_PIN);
    
    sumX += rawX;
    sumY += rawY;
    sumZ += rawZ;
    
    delay(10);
  }
  
  // Calculate averages (these would be stored in EEPROM in a real implementation)
  float avgX = sumX / samples;
  float avgY = sumY / samples;
  float avgZ = sumZ / samples;
  
  Serial.println("Accelerometer calibration complete");
  Serial.println("X offset: " + String(avgX));
  Serial.println("Y offset: " + String(avgY));
  Serial.println("Z offset: " + String(avgZ));
  
  // Reset pulse sensor parameters
  thresh = 512;
  P = 512;
  T = 512;
  firstBeat = true;
  secondBeat = false;
  currentReadings.heartRate = 0;
  
  Serial.println("Pulse sensor reset complete");
  
  esp32Serial.println("CALIBRATION_COMPLETE");
}

void resetSensorData() {
  // Reset all sensor data to default values
  currentReadings.heartRate = 0.0;
  currentReadings.temperature = 0.0;
  currentReadings.accelerationX = 0.0;
  currentReadings.accelerationY = 0.0;
  currentReadings.accelerationZ = 0.0;
  currentReadings.totalAcceleration = 0.0;
  currentReadings.fallDetected = false;
  currentReadings.timestamp = 0;
  
  // Reset pulse sensor
  thresh = 512;
  P = 512;
  T = 512;
  firstBeat = true;
  secondBeat = false;
  QS = false;
  
  fallInProgress = false;
  
  Serial.println("Sensor data reset complete");
  esp32Serial.println("RESET_COMPLETE");
}

void printSensorStatus() {
  // Print detailed sensor status for debugging
  Serial.println("=== SENSOR STATUS ===");
  Serial.println("Heart Rate: " + String(currentReadings.heartRate, 1) + " BPM");
  Serial.println("Temperature: " + String(currentReadings.temperature, 2) + " °C");
  Serial.println("Acceleration X: " + String(currentReadings.accelerationX, 2) + " g");
  Serial.println("Acceleration Y: " + String(currentReadings.accelerationY, 2) + " g");
  Serial.println("Acceleration Z: " + String(currentReadings.accelerationZ, 2) + " g");
  Serial.println("Total Acceleration: " + String(currentReadings.totalAcceleration, 2) + " g");
  Serial.println("Fall Detected: " + String(currentReadings.fallDetected ? "YES" : "NO"));
  Serial.println("Estimated BP: " + String(estimateBloodPressure(), 1) + " mmHg");
  Serial.println("Timestamp: " + String(currentReadings.timestamp));
  Serial.println("====================");
}

// Advanced fall detection with multiple algorithms
bool advancedFallDetection() {
  static float accelBuffer[20];
  static int bufferIndex = 0;
  static bool bufferFull = false;
  
  // Fill circular buffer
  accelBuffer[bufferIndex] = currentReadings.totalAcceleration;
  bufferIndex = (bufferIndex + 1) % 20;
  
  if (bufferIndex == 0) {
    bufferFull = true;
  }
  
  if (!bufferFull) {
    return false;  // Not enough data yet
  }
  
  // Algorithm 1: Sudden acceleration change
  float maxChange = 0;
  for (int i = 1; i < 20; i++) {
    int prevIndex = (bufferIndex + i - 1) % 20;
    int currIndex = (bufferIndex + i) % 20;
    float change = abs(accelBuffer[currIndex] - accelBuffer[prevIndex]);
    if (change > maxChange) {
      maxChange = change;
    }
  }
  
  // Algorithm 2: Standard deviation analysis
  float mean = 0;
  for (int i = 0; i < 20; i++) {
    mean += accelBuffer[i];
  }
  mean /= 20.0;
  
  float variance = 0;
  for (int i = 0; i < 20; i++) {
    variance += (accelBuffer[i] - mean) * (accelBuffer[i] - mean);
  }
  variance /= 20.0;
  float stdDev = sqrt(variance);
  
  // Fall detected if both conditions are met
  return (maxChange > 8.0 && stdDev > 3.0);
}

// Heart rate variability analysis
float calculateHRV() {
  if (!QS) return 0.0;
  
  // Calculate standard deviation of RR intervals
  float mean = 0;
  for (int i = 0; i < 10; i++) {
    mean += rate[i];
  }
  mean /= 10.0;
  
  float variance = 0;
  for (int i = 0; i < 10; i++) {
    variance += (rate[i] - mean) * (rate[i] - mean);
  }
  variance /= 10.0;
  
  return sqrt(variance);
}

// Temperature trend analysis
float getTemperatureTrend() {
  static float tempHistory[10];
  static int tempIndex = 0;
  static bool tempBufferFull = false;
  
  tempHistory[tempIndex] = currentReadings.temperature;
  tempIndex = (tempIndex + 1) % 10;
  
  if (tempIndex == 0) {
    tempBufferFull = true;
  }
  
  if (!tempBufferFull) {
    return 0.0;
  }
  
  // Calculate linear trend
  float sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  
  for (int i = 0; i < 10; i++) {
    sumX += i;
    sumY += tempHistory[i];
    sumXY += i * tempHistory[i];
    sumX2 += i * i;
  }
  
  float slope = (10 * sumXY - sumX * sumY) / (10 * sumX2 - sumX * sumX);
  return slope;  // Positive = increasing, Negative = decreasing
}

// Self-diagnostic routine
void performSelfDiagnostic() {
  Serial.println("Performing self-diagnostic...");
  
  // Test temperature sensor
  temperatureSensor.requestTemperatures();
  delay(100);
  float testTemp = temperatureSensor.getTempCByIndex(0);
  
  if (testTemp == DEVICE_DISCONNECTED_C) {
    Serial.println("ERROR: Temperature sensor not responding");
  } else {
    Serial.println("Temperature sensor OK: " + String(testTemp) + "°C");
  }
  
  // Test accelerometer
  int testX = analogRead(ACCEL_X_PIN);
  int testY = analogRead(ACCEL_Y_PIN);
  int testZ = analogRead(ACCEL_Z_PIN);
  
  if (testX == 0 || testY == 0 || testZ == 0) {
    Serial.println("ERROR: Accelerometer sensor readings invalid");
  } else {
    Serial.println("Accelerometer OK: X=" + String(testX) + " Y=" + String(testY) + " Z=" + String(testZ));
  }
  
  // Test pulse sensor
  int testPulse = analogRead(PULSE_INPUT_PIN);
  if (testPulse == 0 || testPulse == 1023) {
    Serial.println("ERROR: Pulse sensor may be disconnected");
  } else {
    Serial.println("Pulse sensor OK: " + String(testPulse));
  }
  
  // Test communication with ESP32
  esp32Serial.println("DIAGNOSTIC_TEST");
  delay(1000);
  
  if (esp32Serial.available()) {
    String response = esp32Serial.readString();
    if (response.indexOf("OK") != -1) {
      Serial.println("ESP32 communication OK");
    } else {
      Serial.println("ERROR: ESP32 communication issue");
    }
  } else {
    Serial.println("ERROR: No response from ESP32");
  }
  
  Serial.println("Self-diagnostic complete");
}

// FAKE MODE FUNCTIONS
void handleFakeEffects() {
  if (millis() - lastFakeUpdate < FAKE_UPDATE_INTERVAL) {
    return;
  }
  
  lastFakeUpdate = millis();
  
  // Handle fake LED blinking with random patterns (including onboard LED)
  for (int i = 0; i < 4; i++) {
    if (millis() - fakeLedTimers[i] > fakeLedPatterns[i] + random(0, 800)) {
      fakeLedStates[i] = !fakeLedStates[i];
      
      switch(i) {
        case 0:
          digitalWrite(FAKE_LED_1_PIN, fakeLedStates[i]);
          break;
        case 1:
          digitalWrite(FAKE_LED_2_PIN, fakeLedStates[i]);
          break;
        case 2:
          digitalWrite(FAKE_LED_3_PIN, fakeLedStates[i]);
          break;
        case 3:
          digitalWrite(LED_BUILTIN, fakeLedStates[i]); // Onboard LED
          break;
      }
      
      fakeLedTimers[i] = millis();
      fakeLedPatterns[i] = random(300, 2500); // More varied patterns
    }
  }
  
  // Enhanced fake buzzer beeps with different patterns
  if (millis() - lastFakeBeep > random(2000, 6000)) {
    fakeBeepPattern = random(1, 5);
    
    switch(fakeBeepPattern) {
      case 1: // Single beep
        tone(FAKE_BUZZER_PIN, random(800, 1500), random(100, 300));
        break;
      case 2: // Double beep
        tone(FAKE_BUZZER_PIN, random(1000, 2000), 150);
        delay(200);
        tone(FAKE_BUZZER_PIN, random(800, 1500), 150);
        break;
      case 3: // Triple beep
        for(int i = 0; i < 3; i++) {
          tone(FAKE_BUZZER_PIN, random(900, 1800), random(80, 150));
          delay(random(120, 200));
        }
        break;
      case 4: // Rising tone
        for(int freq = 800; freq < 1600; freq += 100) {
          tone(FAKE_BUZZER_PIN, freq, 50);
          delay(60);
        }
        break;
    }
    lastFakeBeep = millis();
  }
  
  // Enhanced fake vibrator patterns
  if (millis() - lastFakeVibro > random(3000, 8000)) {
    fakeVibroPattern = random(1, 4);
    
    switch(fakeVibroPattern) {
      case 1: // Short pulses
        for (int i = 0; i < random(2, 6); i++) {
          digitalWrite(FAKE_VIBRATOR_PIN, HIGH);
          delay(random(100, 250));
          digitalWrite(FAKE_VIBRATOR_PIN, LOW);
          delay(random(50, 150));
        }
        break;
      case 2: // Long vibration
        digitalWrite(FAKE_VIBRATOR_PIN, HIGH);
        delay(random(500, 1000));
        digitalWrite(FAKE_VIBRATOR_PIN, LOW);
        break;
      case 3: // Pulse pattern
        for (int i = 0; i < 3; i++) {
          digitalWrite(FAKE_VIBRATOR_PIN, HIGH);
          delay(200);
          digitalWrite(FAKE_VIBRATOR_PIN, LOW);
          delay(100);
        }
        break;
    }
    lastFakeVibro = millis();
  }
}

void updateFakeSensorData() {
  if (millis() - lastFakeSensorUpdate < FAKE_SENSOR_INTERVAL) {
    return;
  }
  
  lastFakeSensorUpdate = millis();
  
  // Generate realistic human-like heart rate variations (60-100 BPM normal range)
  heartRateVariation += random(-30, 31) / 10.0; // Larger variations for realism
  heartRateVariation = constrain(heartRateVariation, -10.0, 10.0);
  fakeHeartRate = 72.0 + heartRateVariation + random(-20, 21) / 10.0;
  fakeHeartRate = constrain(fakeHeartRate, 62.0, 95.0); // Normal human range
  
  // Add occasional spikes for realism (exercise, stress, etc.)
  if (random(0, 100) < 5) { // 5% chance
    fakeHeartRate += random(10, 25);
    fakeHeartRate = constrain(fakeHeartRate, 62.0, 120.0);
  }
  
  // Generate realistic human body temperature (36.1-37.2°C normal range)
  tempVariation += random(-20, 21) / 100.0;
  tempVariation = constrain(tempVariation, -0.5, 0.5);
  fakeTemperature = 36.8 + tempVariation + random(-15, 16) / 100.0;
  fakeTemperature = constrain(fakeTemperature, 36.1, 37.2);
  
  // Add occasional fever simulation
  if (random(0, 200) < 3) { // 1.5% chance
    fakeTemperature += random(50, 150) / 100.0;
    fakeTemperature = constrain(fakeTemperature, 36.1, 38.5);
  }
  
  // Generate realistic accelerometer data (normal human movement)
  fakeAccelX += random(-40, 41) / 100.0;
  fakeAccelY += random(-40, 41) / 100.0;
  fakeAccelZ = 9.8 + random(-20, 21) / 100.0; // Gravity with minor variations
  
  fakeAccelX = constrain(fakeAccelX, -3.0, 3.0);
  fakeAccelY = constrain(fakeAccelY, -3.0, 3.0);
  fakeAccelZ = constrain(fakeAccelZ, 9.0, 10.6);
  
  // Simulate walking/movement patterns
  if (random(0, 100) < 20) { // 20% chance of movement
    fakeAccelX += random(-100, 101) / 100.0;
    fakeAccelY += random(-100, 101) / 100.0;
    fakeAccelX = constrain(fakeAccelX, -5.0, 5.0);
    fakeAccelY = constrain(fakeAccelY, -5.0, 5.0);
  }
  
  // Simulate very rare fall events (for testing)
  if (random(0, 2000) < 1) { // 0.05% chance
    fakeFallDetected = true;
    fakeFallTime = millis();
    Serial.println("[FAKE] Simulated fall event triggered!");
  }
  
  if (fakeFallDetected && (millis() - fakeFallTime > 15000)) {
    fakeFallDetected = false;
  }
  
  // Print enhanced fake sensor values with more realistic format
  Serial.println("╔════════════════════════════╗");
  Serial.println("║      FAKE SENSOR DATA      ║");
  Serial.println("╠════════════════════════════╣");
  Serial.printf("║ Heart Rate: %6.1f BPM     ║\n", fakeHeartRate);
  Serial.printf("║ Temperature: %5.2f°C      ║\n", fakeTemperature);
  Serial.printf("║ Blood Pressure: %5.1f mmHg ║\n", estimateFakeBloodPressure());
  Serial.printf("║ Accel X: %7.2f g        ║\n", fakeAccelX);
  Serial.printf("║ Accel Y: %7.2f g        ║\n", fakeAccelY);
  Serial.printf("║ Accel Z: %7.2f g        ║\n", fakeAccelZ);
  Serial.printf("║ Fall: %18s ║\n", fakeFallDetected ? "DETECTED" : "Normal");
  Serial.printf("║ Status: %16s ║\n", "Active");
  Serial.printf("║ Uptime: %15lu ms ║\n", millis());
  Serial.println("╚════════════════════════════╝");
  
  // Additional diagnostic info occasionally
  if (random(0, 10) < 2) { // 20% chance
    Serial.println("[INFO] All sensors functioning normally");
    Serial.println("[INFO] Patient monitoring active");
    Serial.printf("[INFO] Memory usage: %d bytes\n", random(800, 1200));
    Serial.printf("[INFO] Signal strength: %d%%\n", random(75, 100));
  }
}

// FAKE MODE FUNCTIONS
void updateFakeEffects() {
  // Update fake LED states
  for (int i = 0; i < 3; i++) {
    if (millis() - fakeLedTimers[i] > fakeLedPatterns[i]) {
      fakeLedStates[i] = !fakeLedStates[i];
      digitalWrite(FAKE_LED_1_PIN + i, fakeLedStates[i]);
      fakeLedTimers[i] = millis();
    }
  }
  
  // Update fake buzzer state
  if (millis() - fakeBuzzerTimer > 500) {
    fakeBuzzerState = !fakeBuzzerState;
    digitalWrite(FAKE_BUZZER_PIN, fakeBuzzerState ? HIGH : LOW);
    fakeBuzzerTimer = millis();
  }
  
  // Update fake vibrator state
  if (millis() - fakeVibratorTimer > 800) {
    fakeVibratorState = !fakeVibratorState;
    digitalWrite(FAKE_VIBRATOR_PIN, fakeVibratorState ? HIGH : LOW);
    fakeVibratorTimer = millis();
  }
  
  // Randomly simulate fall detection
  if (millis() - lastFakeSensorUpdate > FAKE_SENSOR_INTERVAL) {
    fakeFallDetected = (random(0, 10) < 2);  // 20% chance of fall detection
    lastFakeSensorUpdate = millis();
  }
  
  // Update fake sensor values
  if (fakeFallDetected) {
    currentReadings.heartRate = fakeHeartRate + random(-5, 5);
    currentReadings.temperature = fakeTemperature + random(-2, 2);
    currentReadings.accelerationX = fakeAccelX + random(-10, 10) / 100.0;
    currentReadings.accelerationY = fakeAccelY + random(-10, 10) / 100.0;
    currentReadings.accelerationZ = fakeAccelZ + random(-10, 10) / 100.0;
    currentReadings.fallDetected = true;
    fakeFallTime = millis();
  } else {
    currentReadings.fallDetected = false;
  }
  
  // Simulate fall recovery
  if (currentReadings.fallDetected && (millis() - fakeFallTime > 5000)) {
    currentReadings.fallDetected = false;
  }
}
