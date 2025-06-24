// Patient Dashboard for Rescue.net AI - Real-time health monitoring interface
// Displays live data from ESP32 wearable device with emergency detection
// Built for Central India Hackathon 2.0 prototype - Premium Professional Version

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Alert,
  Chip,
  LinearProgress,
  Divider,
  IconButton,
  Tooltip,
  Avatar,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Badge
} from '@mui/material';
import {
  Favorite,
  Thermostat,
  LocalHospital,
  Battery80,
  LocationOn,
  Warning,
  CheckCircle,
  Error,
  Wifi,
  WifiOff,
  PersonOutline,
  Notifications,
  MoreVert,
  Settings,
  TrendingUp,
  AcUnit,
  MonitorHeart,
  Water,
  DirectionsRun,
  DeviceUnknown,
  AccessTime
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useRealTimeHealthData } from '../hooks/useRealTimeHealthData';
import { 
  GlassCard, 
  GlassCardDark,
  GradientText, 
  StatusIndicator, 
  PulseElement,
  AnimatedBackground,
  DataCard,
  StatGrid,
  GradientButton,
  GlassButton
} from '../components/ModernUI';

// Dummy data for charts
const generateHeartRateData = () => {
  const data = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: Math.floor(Math.random() * 20 + 70),
    });
  }
  return data;
};

const generateTemperatureData = () => {
  const data = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: +(36.2 + Math.random() * 1.3).toFixed(1),
    });
  }
  return data;
};

const PatientDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  
  // Sample user info
  const user = {
    name: 'Kalvin Shah',
    avatar: '/avatar.jpg',
    age: 34,
    weight: '76 kg',
    height: '180 cm',
    bloodType: 'O+',
  };

  // Sample notification data
  const notifications = [
    { id: 1, message: 'Battery level below 20%', time: '10 mins ago', read: false },
    { id: 2, message: 'Heart rate elevated for 15 minutes', time: '25 mins ago', read: true },
    { id: 3, message: 'Temperature rising above normal', time: '1 hour ago', read: true },
  ];
  
  // Generate chart data once
  const heartRateData = React.useMemo(() => generateHeartRateData(), []);
  const temperatureData = React.useMemo(() => generateTemperatureData(), []);

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <AnimatedBackground variant="professional" intensity="light" sx={{ minHeight: '100vh' }}>
      {/* Header & Navigation */}
      <Box sx={{ 
        p: { xs: 2, md: 3 },
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1400, mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PulseElement>
              <LocalHospital sx={{ color: '#ff6b6b', mr: 1, fontSize: 32 }} />
            </PulseElement>
            <GradientText variant="h5" gradient="linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)">
              Rescue.net AI
            </GradientText>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 20,
              px: 2,
              py: 0.5,
              mr: 2
            }}>
              <StatusIndicator 
                status={isConnected ? 'online' : 'offline'} 
                showLabel={true}
                label={connectionStatus}
              />
            </Box>
            
            <Tooltip title="Notifications">
              <IconButton onClick={handleNotificationsOpen}>
                <Badge badgeContent={unreadNotifications} color="error">
                  <Notifications sx={{ color: 'rgba(0,0,0,0.7)' }} />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Menu
              anchorEl={notificationsAnchor}
              open={Boolean(notificationsAnchor)}
              onClose={handleNotificationsClose}
              PaperProps={{
                style: {
                  borderRadius: 16,
                  minWidth: 280,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)'
                }
              }}
            >
              <Typography sx={{ p: 2, fontWeight: 600 }}>Notifications</Typography>
              <Divider />
              {notifications.map(notification => (
                <MenuItem 
                  key={notification.id} 
                  onClick={handleNotificationsClose}
                  sx={{ 
                    opacity: notification.read ? 0.7 : 1,
                    borderLeft: notification.read ? 'none' : '3px solid #667eea',
                    py: 1.5
                  }}
                >
                  <Box>
                    <Typography variant="body2">{notification.message}</Typography>
                    <Typography variant="caption" color="text.secondary">{notification.time}</Typography>
                  </Box>
                </MenuItem>
              ))}
              <Divider />
              <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'center' }}>
                <GlassButton size="small">View All</GlassButton>
              </Box>
            </Menu>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                src={user.avatar}
                alt={user.name}
                sx={{ 
                  width: 40, 
                  height: 40,
                  border: '2px solid rgba(255,255,255,0.5)',
                  cursor: 'pointer'
                }}
                onClick={handleMenuOpen}
              >
                <PersonOutline />
              </Avatar>
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{ ml: 1, display: { xs: 'flex', md: 'none' } }}
              >
                <MoreVert />
              </IconButton>
            </Box>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  borderRadius: 16,
                  minWidth: 180,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)'
                }
              }}
            >
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">Patient</Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
      
      {/* Main Content */}
      <Container sx={{ py: 3, maxWidth: 1400, mx: 'auto' }}>
        {/* Patient Info Card */}
        <GlassCard sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ 
                width: 80, 
                height: 80, 
                mr: 3,
                border: '3px solid rgba(255,255,255,0.7)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <PersonOutline fontSize="large" />
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {user.age} yrs • {user.bloodType} • {user.height} • {user.weight}
                  </Typography>
                </Box>
                
                <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                  <Chip
                    label={healthStatus.status}
                    color={healthStatus.color}
                    icon={healthStatus.color === 'error' ? <Error /> : <CheckCircle />}
                    sx={{
                      borderRadius: '12px',
                      py: 2,
                      fontWeight: 600,
                      background: healthStatus.color === 'error' 
                        ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)'
                        : healthStatus.color === 'warning'
                        ? 'linear-gradient(135deg, #ffa726 0%, #f57c00 100%)'
                        : 'linear-gradient(135deg, #4dd0e1 0%, #00acc1 100%)',
                      color: 'white',
                    }}
                  />
                  <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center' }}>
                    Last update: {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </GlassCard>

        {/* Alert Banner if not connected */}
        {!isConnected && (
          <Alert 
            severity="warning" 
            icon={<DeviceUnknown />}
            sx={{ 
              mb: 4,
              background: 'rgba(255, 152, 0, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 152, 0, 0.2)',
              borderRadius: 3,
            }}
            action={
              <GradientButton 
                size="small" 
                sx={{ background: 'linear-gradient(135deg, #ffa726 0%, #f57c00 100%)' }}
              >
                Reconnect
              </GradientButton>
            }
          >
            <Typography variant="subtitle2">Device Connection Lost</Typography>
            <Typography variant="body2">The wearable device is currently offline. Data may not be up-to-date.</Typography>
          </Alert>
        )}
        
        {/* Emergency Alerts */}
        {emergencyAlerts.length > 0 && (
          <GlassCardDark sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Warning sx={{ color: '#ff6b6b', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                Emergency Alerts
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {emergencyAlerts.slice(0, 3).map((alert) => (
                <Box
                  key={alert.id}
                  sx={{ 
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(255, 107, 107, 0.08)',
                    border: '1px solid rgba(255, 107, 107, 0.2)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                      {alert.type}
                    </Typography>
                    <Chip 
                      label={alert.severity} 
                      size="small"
                      sx={{ 
                        background: alert.severity === 'critical' ? '#ff6b6b' : '#ffa726',
                        color: 'white',
                        textTransform: 'uppercase',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        height: 20
                      }} 
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', my: 1 }}>
                    {alert.message}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    {new Date(alert.timestamp).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <GlassButton size="small">View All Alerts</GlassButton>
            </Box>
          </GlassCardDark>
        )}

        {/* Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : undefined}
            centered={!isMobile}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                minWidth: 100,
                p: 2
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px',
                background: 'linear-gradient(90deg, #667eea, #764ba2)'
              }
            }}
          >
            <Tab label="Overview" icon={<MonitorHeart />} iconPosition="start" />
            <Tab label="Trends" icon={<TrendingUp />} iconPosition="start" />
            <Tab label="History" icon={<AccessTime />} iconPosition="start" />
            <Tab label="Settings" icon={<Settings />} iconPosition="start" />
          </Tabs>
        </Box>
        
        {/* Tab Content - Overview */}
        {activeTab === 0 && (
          <>
            {/* Vital Stats */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Vital Statistics</Typography>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { 
                  xs: '1fr', 
                  sm: '1fr 1fr', 
                  md: 'repeat(4, 1fr)' 
                }, 
                gap: 3 
              }}>
                <DataCard 
                  title="Heart Rate"
                  value={healthData?.heartRate || '--'}
                  unit="BPM"
                  icon={<Favorite sx={{ color: '#ff6b6b', fontSize: 24 }} />}
                  trend="up"
                  trendValue="+5% from last hour"
                />
                
                <DataCard 
                  title="Body Temperature"
                  value={healthData?.temperature?.toFixed(1) || '--'}
                  unit="°C"
                  icon={<Thermostat sx={{ color: '#ffa726', fontSize: 24 }} />}
                  trend="stable"
                  trendValue="Normal range"
                />
                
                <DataCard 
                  title="Oxygen Level"
                  value={healthData?.oxygenSaturation || '--'}
                  unit="%"
                  icon={<Water sx={{ color: '#4dd0e1', fontSize: 24 }} />}
                  trend="down"
                  trendValue="-2% from last hour"
                />
                
                <DataCard 
                  title="Activity Level"
                  value={healthData?.activityLevel || 'Resting'}
                  icon={<DirectionsRun sx={{ color: '#4facfe', fontSize: 24 }} />}
                />
              </Box>
            </Box>
            
            {/* Blood Pressure */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Blood Pressure</Typography>
              <GlassCard sx={{ p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'center', sm: 'flex-end' },
                  gap: 2
                }}>
                  <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Systolic / Diastolic
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                      <Typography 
                        variant="h3" 
                        sx={{ 
                          fontWeight: 700,
                          background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {healthData?.bloodPressure?.systolic || '--'}
                      </Typography>
                      <Typography variant="h5" component="span" sx={{ opacity: 0.7 }}>
                        /
                      </Typography>
                      <Typography 
                        variant="h3" 
                        sx={{ 
                          fontWeight: 700,
                          background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {healthData?.bloodPressure?.diastolic || '--'}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                        mmHg
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                      <Chip 
                        size="small" 
                        label={(healthData?.bloodPressure?.systolic || 0) > 140 ? "High" : "Normal"}
                        color={(healthData?.bloodPressure?.systolic || 0) > 140 ? "warning" : "success"}
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Last reading 15 minutes ago
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ 
                    height: 100, 
                    width: { xs: '100%', sm: '60%' },
                    opacity: 0.8
                  }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { time: '12 AM', systolic: 125, diastolic: 82 },
                          { time: '4 AM', systolic: 118, diastolic: 78 },
                          { time: '8 AM', systolic: 130, diastolic: 85 },
                          { time: '12 PM', systolic: 135, diastolic: 88 },
                          { time: '4 PM', systolic: 128, diastolic: 84 },
                          { time: '8 PM', systolic: 122, diastolic: 80 },
                          { time: 'Now', systolic: 124, diastolic: 81 },
                        ]}
                        margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4facfe" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#4facfe" stopOpacity={0.2}/>
                          </linearGradient>
                          <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#00f2fe" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                        <Area type="monotone" dataKey="systolic" stroke="#4facfe" strokeWidth={2} fillOpacity={1} fill="url(#colorSys)" />
                        <Area type="monotone" dataKey="diastolic" stroke="#00f2fe" strokeWidth={2} fillOpacity={1} fill="url(#colorDia)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              </GlassCard>
            </Box>
            
            {/* Device Status */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Device Status</Typography>
              <GlassCard sx={{ p: 3 }}>
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                  gap: 3
                }}>
                  {/* Battery Status */}
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Battery80 sx={{ color: '#4dd0e1', mr: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Battery Level</Typography>
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      {healthData?.batteryLevel || '--'}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={healthData?.batteryLevel || 0}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          background: (healthData?.batteryLevel || 0) > 20 
                            ? 'linear-gradient(90deg, #4dd0e1, #00acc1)' 
                            : 'linear-gradient(90deg, #ff6b6b, #ee5a52)'
                        }
                      }}
                    />
                  </Box>
                  
                  {/* Device Location */}
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ color: '#667eea', mr: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Device Location</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {healthData?.location ? 
                        `${healthData.location.latitude.toFixed(4)}, ${healthData.location.longitude.toFixed(4)}` : 
                        'Not available'
                      }
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Approximate address: 123 Health St, Medical District, India
                    </Typography>
                  </Box>
                  
                  {/* Connection Details */}
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Wifi sx={{ color: isConnected ? '#4dd0e1' : '#bdbdbd', mr: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Connection Details</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Status: {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                      Device ID: demo-device-001
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Signal strength: {isConnected ? 'Excellent' : 'No signal'}
                    </Typography>
                  </Box>
                </Box>
              </GlassCard>
            </Box>
          </>
        )}
        
        {/* Tab Content - Trends */}
        {activeTab === 1 && (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Health Trends</Typography>
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3
              }}>
                {/* Heart Rate Chart */}
                <GlassCard sx={{ p: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Heart Rate (Last 2 Hours)
                  </Typography>
                  <Box sx={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={heartRateData}
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                        <XAxis 
                          dataKey="time"
                          tick={{ fontSize: 11 }}
                          axisLine={{ stroke: 'rgba(0,0,0,0.2)' }}
                        />
                        <YAxis 
                          domain={['dataMin - 10', 'dataMax + 10']} 
                          tick={{ fontSize: 11 }}
                          axisLine={{ stroke: 'rgba(0,0,0,0.2)' }}
                        />
                        <RechartsTooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          name="Heart Rate" 
                          stroke="#ff6b6b" 
                          strokeWidth={2}
                          dot={{ stroke: '#ff6b6b', strokeWidth: 2, r: 3 }}
                          activeDot={{ stroke: '#ff6b6b', strokeWidth: 2, r: 5 }}
                          fillOpacity={1} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </GlassCard>
                
                {/* Temperature Chart */}
                <GlassCard sx={{ p: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Temperature (Last 2 Hours)
                  </Typography>
                  <Box sx={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={temperatureData}
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffa726" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#ffa726" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                        <XAxis 
                          dataKey="time"
                          tick={{ fontSize: 11 }}
                          axisLine={{ stroke: 'rgba(0,0,0,0.2)' }}
                        />
                        <YAxis 
                          domain={[35.5, 38]} 
                          tick={{ fontSize: 11 }}
                          axisLine={{ stroke: 'rgba(0,0,0,0.2)' }}
                        />
                        <RechartsTooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          name="Temperature" 
                          stroke="#ffa726" 
                          strokeWidth={2}
                          dot={{ stroke: '#ffa726', strokeWidth: 2, r: 3 }}
                          activeDot={{ stroke: '#ffa726', strokeWidth: 2, r: 5 }}
                          fillOpacity={1} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </GlassCard>
              </Box>
            </Box>
          </>
        )}
        
        {/* Tab Content - History and Settings */}
        {activeTab === 2 && (
          <GlassCard sx={{ p: 3, textAlign: 'center', py: 5 }}>
            <AcUnit sx={{ fontSize: 60, color: '#667eea', opacity: 0.5, mb: 2 }} />
            <Typography variant="h6">Health History</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Historical data will be displayed here. Coming soon in the next update.
            </Typography>
          </GlassCard>
        )}
        
        {activeTab === 3 && (
          <GlassCard sx={{ p: 3, textAlign: 'center', py: 5 }}>
            <Settings sx={{ fontSize: 60, color: '#667eea', opacity: 0.5, mb: 2 }} />
            <Typography variant="h6">Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Device and app settings will be displayed here. Coming soon in the next update.
            </Typography>
          </GlassCard>
        )}
      </Container>
    </AnimatedBackground>
  );
};

interface ContainerProps {
  children: React.ReactNode;
  sx?: any;
}

const Container: React.FC<ContainerProps> = ({ children, sx = {} }) => (
  <Box sx={{ maxWidth: 1400, mx: 'auto', px: {xs: 2, md: 3}, ...sx }}>{children}</Box>
);

export default PatientDashboard;
