// This file is for the demo patient dashboard.
// It will show a simulated view of the patient's health data.
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Alert,
  Chip,
  LinearProgress,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Favorite,
  Thermostat,
  Water,
  Battery80,
  LocationOn,
  Warning,
  CheckCircle,
  Error,
  Wifi,
  WifiOff,
} from '@mui/icons-material';
import { 
  GlassCard, 
  GradientText, 
  StatusIndicator, 
  PulseElement,
  AnimatedBackground
} from '../components/ModernUI';

interface HealthData {
  heartRate: number;
  temperature: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  oxygenSaturation: number;
  batteryLevel: number;
}

// Function to generate more realistic random data
const generateRealisticData = (prevData: HealthData | null): HealthData => {
  const randomFactor = (Math.random() - 0.5) * 0.1; // Small fluctuation
  const newHeartRate = prevData 
    ? prevData.heartRate + (Math.random() - 0.5) * 2
    : 75 + Math.random() * 10;

  return {
    heartRate: Math.max(50, Math.min(120, newHeartRate)), // Keep within a reasonable range
    temperature: 36.5 + (Math.random() - 0.5) * 0.5,
    bloodPressure: {
      systolic: 120 + (Math.random() - 0.5) * 10,
      diastolic: 80 + (Math.random() - 0.5) * 5,
    },
    oxygenSaturation: 98 + (Math.random() - 0.5),
    batteryLevel: 85 + randomFactor * 10,
  };
};


const DemoPatientDashboard: React.FC = () => {
  const [healthData, setHealthData] = useState(generateRealisticData(null));
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [emergencyAlerts, setEmergencyAlerts] = useState<{message: string}[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'error' | 'disconnected'>('connected');

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData(generateRealisticData(healthData));
      setLastUpdate(new Date());
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [healthData]);

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi color="success" />;
      case 'connecting':
        return <Wifi color="warning" />;
      case 'error':
        return <WifiOff color="error" />;
      default:
        return <WifiOff color="disabled" />;
    }
  };

  const getHealthStatus = () => {
    if (!healthData) return { status: 'unknown', color: 'default' as const };
    
    if (healthData.heartRate > 110) {
      return { status: 'Emergency', color: 'error' as const };
    }
    
    const hr = healthData.heartRate;
    const temp = healthData.temperature;
    
    if (hr > 100 || hr < 60 || temp > 37.5 || temp < 36) {
      return { status: 'Warning', color: 'warning' as const };
    }
    
    return { status: 'Normal', color: 'success' as const };
  };

  const healthStatus = getHealthStatus();

  return (
    <AnimatedBackground variant="medical" sx={{ minHeight: '100vh' }}>
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <GlassCard sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <GradientText variant="h4">
              Patient Health Monitor (Demo)
            </GradientText>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tooltip title={`Connection: ${connectionStatus}`}>
                <IconButton>
                  {getConnectionIcon()}
                </IconButton>
              </Tooltip>
              <Chip
                label={healthStatus.status}
                color={healthStatus.color}
                icon={healthStatus.color === 'error' ? <Error /> : <CheckCircle />}
              />
            </Box>
          </Box>
        </GlassCard>

        {/* Main Content */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {/* Health Metrics */}
          <GlassCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Live Health Metrics
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                  <Favorite color="error" sx={{ fontSize: 40 }} />
                  <Typography variant="h6">{healthData.heartRate.toFixed(0)} bpm</Typography>
                  <Typography variant="caption">Heart Rate</Typography>
                </Paper>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                  <Thermostat color="info" sx={{ fontSize: 40 }} />
                  <Typography variant="h6">{healthData.temperature.toFixed(1)} °C</Typography>
                  <Typography variant="caption">Temperature</Typography>
                </Paper>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                  <Water color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6">{healthData.oxygenSaturation.toFixed(1)}%</Typography>
                  <Typography variant="caption">SpO2</Typography>
                </Paper>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                  <Battery80 color="success" sx={{ fontSize: 40 }} />
                  <Typography variant="h6">{healthData.batteryLevel.toFixed(0)}%</Typography>
                  <Typography variant="caption">Device Battery</Typography>
                </Paper>
              </Box>
            </CardContent>
          </GlassCard>

          {/* Status & Location */}
          <Box>
            <GlassCard sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  System Status
                </Typography>
                <StatusIndicator status={connectionStatus === 'connected' ? 'online' : 'offline'} lastUpdate={lastUpdate} />
              </CardContent>
            </GlassCard>
            <GlassCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Location
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn color="primary" />
                  <Typography>Nagpur, Maharashtra, India (Simulated)</Typography>
                </Box>
              </CardContent>
            </GlassCard>
          </Box>
        </Box>

        {/* Emergency Alerts */}
        <GlassCard sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Emergency Alerts
            </Typography>
            {emergencyAlerts.length === 0 ? (
              <Alert severity="success">No active emergencies. System is stable.</Alert>
            ) : (
              emergencyAlerts.map((alert, index) => (
                <Alert key={index} severity="error" sx={{ mb: 1 }}>
                  {alert.message}
                </Alert>
              ))
            )}
          </CardContent>
        </GlassCard>
      </Box>
    </AnimatedBackground>
  );
};

export default DemoPatientDashboard;
