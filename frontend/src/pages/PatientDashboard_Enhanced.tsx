// Patient Dashboard for Rescue.net AI - Real-time health monitoring interface
// Displays live data from ESP32 wearable device with emergency detection
// Built for Central India Hackathon 2.0 prototype

import React from 'react';
import {
  Box,
  Typography,
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
  Battery80,
  LocationOn,
  Warning,
  CheckCircle,
  Error,
  Wifi,
  WifiOff,
} from '@mui/icons-material';
import { useRealTimeHealthData } from '../hooks/useRealTimeHealthData';
import { 
  GlassCard, 
  GradientText, 
  StatusIndicator, 
  PulseElement,
  AnimatedBackground
} from '../components/ModernUI';

const PatientDashboard: React.FC = () => {
  const {
    healthData,
    isConnected,
    lastUpdate,
    emergencyAlerts,
    connectionStatus,
  } = useRealTimeHealthData('demo-device-001');

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
    
    if (healthData.isEmergency) {
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
              Patient Health Monitor
            </GradientText>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <StatusIndicator status={isConnected ? 'online' : 'offline'} />
              <Tooltip title={`Connection: ${connectionStatus}`}>
                <IconButton>
                  {getConnectionIcon()}
                </IconButton>
              </Tooltip>
              <Chip
                label={healthStatus.status}
                color={healthStatus.color}
                icon={healthStatus.color === 'error' ? <Error /> : <CheckCircle />}
                sx={{
                  background: healthStatus.color === 'error' 
                    ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)'
                    : healthStatus.color === 'warning'
                    ? 'linear-gradient(135deg, #ffa726 0%, #f57c00 100%)'
                    : 'linear-gradient(135deg, #4dd0e1 0%, #00acc1 100%)',
                  color: 'white',
                }}
              />
            </Box>
          </Box>
        </GlassCard>

        {/* Connection Status */}
        {!isConnected && (
          <Alert 
            severity="warning" 
            sx={{ 
              mb: 2,
              background: 'rgba(255, 152, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 152, 0, 0.3)',
            }}
          >
            Not connected to wearable device. Please check your device connection.
          </Alert>
        )}

        {/* Emergency Alerts */}
        {emergencyAlerts.length > 0 && (
          <GlassCard sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>
              Emergency Alerts
            </Typography>
            {emergencyAlerts.slice(0, 3).map((alert) => (
              <Alert
                key={alert.id}
                severity={alert.severity === 'critical' ? 'error' : 'warning'}
                sx={{ 
                  mb: 1,
                  background: 'rgba(255, 107, 107, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 107, 107, 0.3)',
                }}
                icon={<Warning />}
              >
                <Typography variant="subtitle2">{alert.type}</Typography>
                <Typography variant="body2">{alert.message}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(alert.timestamp).toLocaleString()}
                </Typography>
              </Alert>
            ))}
          </GlassCard>
        )}

        {/* Health Metrics Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 3, mb: 3 }}>
          {/* Heart Rate */}
          <GlassCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PulseElement>
                  <Favorite sx={{ color: '#ff6b6b', mr: 1, fontSize: 28 }} />
                </PulseElement>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Heart Rate</Typography>
              </Box>
              <Typography 
                variant="h3" 
                component="div" 
                sx={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                }}
              >
                {healthData?.heartRate || '--'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)', fontWeight: 500 }}>
                BPM
              </Typography>
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={healthData?.heartRate ? Math.min((healthData.heartRate / 120) * 100, 100) : 0}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.3)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </CardContent>
          </GlassCard>

          {/* Temperature */}
          <GlassCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Thermostat sx={{ color: '#ffa726', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Temperature</Typography>
              </Box>
              <Typography 
                variant="h3" 
                component="div" 
                sx={{
                  background: 'linear-gradient(135deg, #ffa726 0%, #f57c00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                }}
              >
                {healthData?.temperature?.toFixed(1) || '--'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)', fontWeight: 500 }}>
                °C
              </Typography>
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={healthData?.temperature ? Math.min(((healthData.temperature - 35) / 5) * 100, 100) : 0}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.3)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(135deg, #ffa726 0%, #f57c00 100%)',
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </CardContent>
          </GlassCard>

          {/* Battery */}
          <GlassCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Battery80 sx={{ color: '#4dd0e1', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Battery</Typography>
              </Box>
              <Typography 
                variant="h3" 
                component="div" 
                sx={{
                  background: 'linear-gradient(135deg, #4dd0e1 0%, #00acc1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                }}
              >
                {healthData?.batteryLevel || '--'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)', fontWeight: 500 }}>
                %
              </Typography>
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={healthData?.batteryLevel || 0}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.3)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(135deg, #4dd0e1 0%, #00acc1 100%)',
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </CardContent>
          </GlassCard>
        </Box>

        {/* Device Status */}
        <GlassCard sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Device Status
          </Typography>
          <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ color: '#667eea', mr: 1 }} />
            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.8)' }}>
              Location: {healthData?.location ? 
                `${healthData.location.latitude.toFixed(4)}, ${healthData.location.longitude.toFixed(4)}` : 
                'Not available'
              }
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)' }}>
            Last update: {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'}
          </Typography>
        </GlassCard>
      </Box>
    </AnimatedBackground>
  );
};

export default PatientDashboard;
