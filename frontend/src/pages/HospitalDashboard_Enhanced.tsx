/*
 * Professional Hospital Command Center - Premium emergency response coordination system
 * Advanced real-time patient monitoring with AI-powered analytics and glassmorphism design
 * 
 * Built for Central India Hackathon 2.0 - Emergency Response System
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Alert,
  Chip,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  LinearProgress,
  Avatar,
  Stack,
  Grid,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  LocalHospital,
  Logout,
  Emergency,
  People,
  Notifications,
  TrendingUp,
  Phone,
  LocationOn,
  MonitorHeart,
  Warning,
  CheckCircle,
  AccessTime,
  Dashboard,
  Analytics,
  Settings,
  Security,
  Assignment,
  PersonAdd,
  Healing,
  MedicalServices,
  Flight,
  Speed,
  Timeline,
  Add,
  Edit,
  Delete,
  Refresh,
  FilterList,
  Search,
  Download,
  Print,
  Share,
  MoreVert,
  Schedule,
  Room,
  PersonPin,
  CancelScheduleSend,
  FlightTakeoff,
  Business,
  LiveHelp,
  Star,
  PriorityHigh,
  CancelOutlined,
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { 
  GlassCard, 
  GlassCardDark,
  GradientText, 
  StatusIndicator, 
  AnimatedBackground,
  GradientButton,
  GlassButton,
  DataCard,
  StatGrid
} from '../components/ModernUI';

interface PatientStatus {
  id: string;
  name: string;
  age: number;
  condition: 'critical' | 'stable' | 'warning';
  heartRate: number;
  temperature: number;
  location: string;
  lastUpdate: string;
  emergencyType?: string;
  riskScore?: number;
  priority?: 'high' | 'medium' | 'low';
  deviceStatus?: 'online' | 'offline' | 'warning';
  assignedDoctor?: string;
  roomNumber?: string;
  admissionDate?: string;
}

interface EmergencyIncident {
  id: string;
  patientName: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'responding' | 'resolved';
  location: string;
  timestamp: string;
  responder?: string;
  estimatedArrival?: string;
  responseTime?: string;
  priority?: number;
}

interface HospitalResource {
  id: string;
  type: 'bed' | 'ventilator' | 'ambulance' | 'doctor' | 'nurse';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  location?: string;
  assignedTo?: string;
  nextAvailable?: string;
}

interface AIAnalytics {
  riskPredictions: {
    patientId: string;
    riskLevel: number;
    predictedIssue: string;
    confidence: number;
  }[];
  resourceOptimization: {
    recommendation: string;
    impact: string;
    urgency: 'low' | 'medium' | 'high';
  }[];
  emergencyTrends: {
    hour: string;
    count: number;
    severity: number;
  }[];
}

const HospitalDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [patients, setPatients] = useState<PatientStatus[]>([]);
  const [emergencies, setEmergencies] = useState<EmergencyIncident[]>([]);
  const [resources, setResources] = useState<HospitalResource[]>([]);
  const [aiAnalytics, setAiAnalytics] = useState<AIAnalytics | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hospitalStats, setHospitalStats] = useState({
    totalPatients: 0,
    activeEmergencies: 0,
    criticalPatients: 0,
    availableBeds: 15,
    totalBeds: 50,
    onDutyStaff: 12,
    totalStaff: 25,
    ventilators: { available: 8, total: 12 },
    ambulances: { available: 4, total: 6 },
    avgResponseTime: '8.5 min',
    systemStatus: 'optimal' as 'optimal' | 'warning' | 'critical',
    aiConfidence: 95.2,
  });

  // Enhanced data simulation with more realistic features
  useEffect(() => {
    // Generate comprehensive mock patient data
    const mockPatients: PatientStatus[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        age: 45,
        condition: 'critical',
        heartRate: 125,
        temperature: 38.5,
        location: 'Andheri, Mumbai',
        lastUpdate: '2 min ago',
        emergencyType: 'Cardiac Event',
        riskScore: 8.7,
        priority: 'high',
        deviceStatus: 'online',
        assignedDoctor: 'Dr. Priya Shah',
        roomNumber: 'ICU-201',
        admissionDate: '2024-01-15',
      },
      {
        id: '2',
        name: 'Priya Sharma',
        age: 32,
        condition: 'stable',
        heartRate: 78,
        temperature: 37.1,
        location: 'Bandra, Mumbai',
        lastUpdate: '5 min ago',
        riskScore: 2.1,
        priority: 'low',
        deviceStatus: 'online',
        assignedDoctor: 'Dr. Amit Verma',
        roomNumber: 'Ward-105',
        admissionDate: '2024-01-14',
      },
      {
        id: '3',
        name: 'Amit Patel',
        age: 28,
        condition: 'warning',
        heartRate: 110,
        temperature: 37.8,
        location: 'Powai, Mumbai',
        lastUpdate: '1 min ago',
        emergencyType: 'Fall Detected',
        riskScore: 6.3,
        priority: 'medium',
        deviceStatus: 'warning',
        assignedDoctor: 'Dr. Sunita Desai',
        roomNumber: 'ER-302',
        admissionDate: '2024-01-15',
      },
      {
        id: '4',
        name: 'Sunita Desai',
        age: 67,
        condition: 'stable',
        heartRate: 72,
        temperature: 36.9,
        location: 'Juhu, Mumbai',
        lastUpdate: '3 min ago',
        riskScore: 3.4,
        priority: 'low',
        deviceStatus: 'online',
        assignedDoctor: 'Dr. Rajesh Mehta',
        roomNumber: 'Ward-208',
        admissionDate: '2024-01-13',
      },
      {
        id: '5',
        name: 'Vikram Singh',
        age: 55,
        condition: 'critical',
        heartRate: 140,
        temperature: 39.2,
        location: 'Thane, Mumbai',
        lastUpdate: '1 min ago',
        emergencyType: 'Respiratory Distress',
        riskScore: 9.1,
        priority: 'high',
        deviceStatus: 'online',
        assignedDoctor: 'Dr. Kavita Iyer',
        roomNumber: 'ICU-103',
        admissionDate: '2024-01-15',
      }
    ];

    // Enhanced emergency incidents
    const mockEmergencies: EmergencyIncident[] = [
      {
        id: 'e1',
        patientName: 'Rajesh Kumar',
        type: 'Cardiac Event',
        severity: 'critical',
        status: 'responding',
        location: 'Andheri, Mumbai',
        timestamp: '10:45 AM',
        responder: 'Dr. Priya Shah',
        estimatedArrival: '12 min',
        responseTime: '3.2 min',
        priority: 1,
      },
      {
        id: 'e2',
        patientName: 'Vikram Singh',
        type: 'Respiratory Distress',
        severity: 'critical',
        status: 'active',
        location: 'Thane, Mumbai',
        timestamp: '11:20 AM',
        estimatedArrival: '15 min',
        priority: 1,
      },
      {
        id: 'e3',
        patientName: 'Amit Patel',
        type: 'Fall Detection',
        severity: 'medium',
        status: 'active',
        location: 'Powai, Mumbai',
        timestamp: '11:20 AM',
        estimatedArrival: '8 min',
        priority: 2,
      },
      {
        id: 'e4',
        patientName: 'Maya Singh',
        type: 'High Temperature',
        severity: 'low',
        status: 'resolved',
        location: 'Malad, Mumbai',
        timestamp: '09:30 AM',
        responder: 'Dr. Amit Verma',
        responseTime: '5.7 min',
        priority: 3,
      },
    ];

    // Mock hospital resources
    const mockResources: HospitalResource[] = [
      { id: 'bed1', type: 'bed', status: 'available', location: 'ICU' },
      { id: 'bed2', type: 'bed', status: 'occupied', location: 'Ward-A', assignedTo: 'Rajesh Kumar' },
      { id: 'vent1', type: 'ventilator', status: 'available', location: 'ICU' },
      { id: 'vent2', type: 'ventilator', status: 'occupied', location: 'ICU', assignedTo: 'Vikram Singh' },
      { id: 'amb1', type: 'ambulance', status: 'available', nextAvailable: '10 min' },
      { id: 'amb2', type: 'ambulance', status: 'occupied', assignedTo: 'Emergency Response Team' },
    ];

    // Mock AI analytics
    const mockAiAnalytics: AIAnalytics = {
      riskPredictions: [
        { patientId: '1', riskLevel: 8.7, predictedIssue: 'Cardiac complications', confidence: 94.2 },
        { patientId: '5', riskLevel: 9.1, predictedIssue: 'Respiratory failure', confidence: 97.8 },
        { patientId: '3', riskLevel: 6.3, predictedIssue: 'Post-fall complications', confidence: 87.5 },
      ],
      resourceOptimization: [
        { recommendation: 'Allocate additional ICU staff for critical patients', impact: 'High', urgency: 'high' },
        { recommendation: 'Prepare ventilator for incoming patient', impact: 'Medium', urgency: 'medium' },
      ],
      emergencyTrends: [
        { hour: '08:00', count: 2, severity: 3.2 },
        { hour: '09:00', count: 1, severity: 2.1 },
        { hour: '10:00', count: 4, severity: 6.8 },
        { hour: '11:00', count: 3, severity: 7.2 },
        { hour: '12:00', count: 1, severity: 4.5 },
      ],
    };

    setPatients(mockPatients);
    setEmergencies(mockEmergencies);
    setResources(mockResources);
    setAiAnalytics(mockAiAnalytics);
    
    setHospitalStats(prev => ({
      ...prev,
      totalPatients: mockPatients.length,
      activeEmergencies: mockEmergencies.filter(e => e.status === 'active').length,
      criticalPatients: mockPatients.filter(p => p.condition === 'critical').length,
    }));

    // Enhanced real-time simulation with more realistic updates
    const interval = setInterval(() => {
      setPatients(prev => prev.map(patient => ({
        ...patient,
        heartRate: Math.max(60, Math.min(150, patient.heartRate + (Math.random() - 0.5) * 5)),
        temperature: Math.round((Math.max(36, Math.min(40, patient.temperature + (Math.random() - 0.5) * 0.3))) * 10) / 10,
        lastUpdate: 'Just now',
        riskScore: Math.max(0, Math.min(10, (patient.riskScore || 5) + (Math.random() - 0.5) * 0.5)),
      })));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleLogout = () => {
    logout();
  };

  const handleEmergencyResponse = (emergencyId: string) => {
    setEmergencies(prev => prev.map(emergency => 
      emergency.id === emergencyId 
        ? { ...emergency, status: 'responding', responder: 'Dr. On-Call' }
        : emergency
    ));
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'critical': return 'error';
      case 'warning': return 'warning';
      case 'stable': return 'success';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff1744';
      case 'high': return '#ff5722';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#gray';
    }
  };

  // Enhanced chart data
  const bedOccupancyData = [
    { name: 'Occupied', value: hospitalStats.totalBeds - hospitalStats.availableBeds, color: '#ff5722' },
    { name: 'Available', value: hospitalStats.availableBeds, color: '#4caf50' },
  ];

  const severityDistributionData = [
    { name: 'Critical', value: emergencies.filter(e => e.severity === 'critical').length, color: '#f44336' },
    { name: 'High', value: emergencies.filter(e => e.severity === 'high').length, color: '#ff9800' },
    { name: 'Medium', value: emergencies.filter(e => e.severity === 'medium').length, color: '#2196f3' },
    { name: 'Low', value: emergencies.filter(e => e.severity === 'low').length, color: '#4caf50' },
  ];

  const performanceData = [
    { metric: 'Response Time', value: hospitalStats.avgResponseTime, target: '< 10 min', status: 'good' },
    { metric: 'Bed Utilization', value: `${Math.round(((hospitalStats.totalBeds - hospitalStats.availableBeds) / hospitalStats.totalBeds) * 100)}%`, target: '< 85%', status: 'warning' },
    { metric: 'Staff Availability', value: `${hospitalStats.onDutyStaff}/${hospitalStats.totalStaff}`, target: '> 50%', status: 'good' },
    { metric: 'AI Confidence', value: `${hospitalStats.aiConfidence}%`, target: '> 90%', status: 'excellent' },
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.condition === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <AnimatedBackground />
      
      {/* Premium App Bar */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <LocalHospital sx={{ mr: 2, fontSize: 28, color: '#60a5fa' }} />
            <Box>
              <GradientText variant="h5">
                Rescue.net AI
              </GradientText>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Professional Hospital Command Center
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <StatusIndicator 
              status={hospitalStats.systemStatus === 'optimal' ? 'online' : 
                     hospitalStats.systemStatus === 'warning' ? 'warning' : 'error'} 
              label="System Status" 
            />
            <Badge badgeContent={emergencies.filter(e => e.status === 'active').length} color="error">
              <Notifications sx={{ color: 'rgba(255,255,255,0.8)' }} />
            </Badge>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                {user?.name || 'Hospital Admin'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Emergency Coordinator
              </Typography>
            </Box>
            <GlassButton onClick={handleLogout} color="error">
              <Logout />
            </GlassButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Critical Emergency Alert */}
        {emergencies.filter(e => e.status === 'active' && e.severity === 'critical').length > 0 && (
          <GlassCard 
            sx={{ 
              mb: 3, 
              border: '2px solid #f44336',
              animation: 'pulse 2s infinite',
              background: 'linear-gradient(135deg, rgba(244,67,54,0.1) 0%, rgba(244,67,54,0.05) 100%)',
            }}
          >
            <Alert 
              severity="error" 
              sx={{ 
                background: 'transparent',
                '& .MuiAlert-icon': { fontSize: 28 }
              }}
              action={
                <GradientButton 
                  size="small" 
                  onClick={() => setShowEmergencyDialog(true)}
                >
                  EMERGENCY PROTOCOL
                </GradientButton>
              }
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                🚨 {emergencies.filter(e => e.status === 'active' && e.severity === 'critical').length} CRITICAL EMERGENCY{emergencies.filter(e => e.status === 'active' && e.severity === 'critical').length > 1 ? 'S' : ''} ACTIVE
              </Typography>
              <Typography variant="body2">
                Immediate medical intervention required. All emergency protocols activated.
              </Typography>
            </Alert>
          </GlassCard>
        )}

        {/* Enhanced Statistics Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(6, 1fr)'
          }, 
          gap: 3, 
          mb: 4 
        }}>
          <DataCard
            title="Active Patients"
            value={hospitalStats.totalPatients}
            trendValue="+3 today"
            icon={<People />}
            trend="up"
          />
          <DataCard
            title="Critical Cases"
            value={hospitalStats.criticalPatients}
            trendValue="2 new alerts"
            icon={<Emergency />}
            trend="up"
          />
          <DataCard
            title="Available Beds"
            value={hospitalStats.availableBeds}
            trendValue={`${Math.round((hospitalStats.availableBeds/hospitalStats.totalBeds)*100)}% capacity`}
            icon={<LocalHospital />}
            trend="stable"
          />
          <DataCard
            title="Response Time"
            value={hospitalStats.avgResponseTime}
            trendValue="15% faster"
            icon={<Speed />}
            trend="down"
          />
          <DataCard
            title="Staff On Duty"
            value={`${hospitalStats.onDutyStaff}/${hospitalStats.totalStaff}`}
            trendValue="Full coverage"
            icon={<MedicalServices />}
            trend="stable"
          />
          <DataCard
            title="AI Confidence"
            value={`${hospitalStats.aiConfidence}%`}
            trendValue="Optimal performance"
            icon={<Analytics />}
            trend="stable"
          />
        </Box>

        {/* Navigation Tabs */}
        <GlassCard sx={{ mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 600,
                '&.Mui-selected': {
                  color: '#60a5fa',
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#60a5fa',
              }
            }}
          >
            <Tab icon={<Dashboard />} label="Overview" />
            <Tab icon={<Emergency />} label="Emergencies" />
            <Tab icon={<Analytics />} label="Analytics" />
            <Tab icon={<Assignment />} label="Resources" />
            <Tab icon={<Settings />} label="Management" />
          </Tabs>
        </GlassCard>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {/* Real-time Patient Monitoring */}
            <Box sx={{ flex: 2, minWidth: 600 }}>
              <GlassCardDark>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MonitorHeart sx={{ mr: 1, color: '#60a5fa' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                      Real-time Patient Monitoring
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'rgba(255,255,255,0.5)' }} />,
                        sx: { color: 'white' }
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                        }
                      }}
                    />
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        sx={{
                          color: 'white',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="critical">Critical</MenuItem>
                        <MenuItem value="warning">Warning</MenuItem>
                        <MenuItem value="stable">Stable</MenuItem>
                      </Select>
                    </FormControl>
                    <GlassButton onClick={handleRefresh} disabled={refreshing}>
                      {refreshing ? <CircularProgress size={20} /> : <Refresh />}
                    </GlassButton>
                  </Box>
                </Box>
                
                <TableContainer component={Paper} sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ '& th': { color: 'rgba(255,255,255,0.9)', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.1)' } }}>
                        <TableCell>Patient</TableCell>
                        <TableCell>Vitals</TableCell>
                        <TableCell>Risk Score</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredPatients.map((patient) => (
                        <TableRow 
                          key={patient.id} 
                          sx={{ 
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
                            '& td': { color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)' }
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar sx={{ 
                                bgcolor: patient.condition === 'critical' ? '#f44336' : 
                                        patient.condition === 'warning' ? '#ff9800' : '#4caf50',
                                width: 40, height: 40,
                              }}>
                                {patient.name.split(' ').map(n => n[0]).join('')}
                              </Avatar>
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: 'white' }}>
                                  {patient.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                  Age {patient.age} • Room {patient.roomNumber}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                                  Dr. {patient.assignedDoctor}
                                </Typography>
                                {patient.emergencyType && (
                                  <Chip 
                                    label={patient.emergencyType} 
                                    size="small" 
                                    color="error" 
                                    sx={{ mt: 0.5 }}
                                  />
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: patient.heartRate > 100 ? '#f44336' : 'rgba(255,255,255,0.8)',
                                fontWeight: patient.heartRate > 100 ? 700 : 400,
                                display: 'flex', alignItems: 'center', gap: 1
                              }}>
                                <MonitorHeart fontSize="small" />
                                {Math.round(patient.heartRate)} BPM
                              </Typography>
                              <Typography variant="body2" sx={{ 
                                color: patient.temperature > 37.5 ? '#f44336' : 'rgba(255,255,255,0.8)',
                                fontWeight: patient.temperature > 37.5 ? 700 : 400,
                                display: 'flex', alignItems: 'center', gap: 1, mt: 0.5
                              }}>
                                🌡️ {patient.temperature}°C
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                <Box sx={{ 
                                  width: 8, height: 8, borderRadius: '50%',
                                  backgroundColor: patient.deviceStatus === 'online' ? '#4caf50' : 
                                                 patient.deviceStatus === 'warning' ? '#ff9800' : '#f44336'
                                }} />
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                  Device {patient.deviceStatus}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{
                                width: 40, height: 40,
                                borderRadius: '50%',
                                background: `conic-gradient(${
                                  (patient.riskScore || 0) > 7 ? '#f44336' : 
                                  (patient.riskScore || 0) > 4 ? '#ff9800' : '#4caf50'
                                } ${((patient.riskScore || 0) / 10) * 360}deg, rgba(255,255,255,0.1) 0deg)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                position: 'relative'
                              }}>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'white' }}>
                                  {(patient.riskScore || 0).toFixed(1)}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                  Risk Level
                                </Typography>
                                <Chip 
                                  label={patient.priority?.toUpperCase()} 
                                  size="small"
                                  color={(patient.priority === 'high') ? 'error' : 
                                        (patient.priority === 'medium') ? 'warning' : 'success'}
                                  sx={{ ml: 1 }}
                                />
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={patient.condition.toUpperCase()}
                              color={(patient.condition === 'critical') ? 'error' : 
                                     (patient.condition === 'warning') ? 'warning' : 'success'}
                              variant="filled"
                              sx={{ fontWeight: 600 }}
                            />
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block', mt: 0.5 }}>
                              Updated {patient.lastUpdate}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                              📍 {patient.location}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <GlassButton size="small">
                                <Phone fontSize="small" />
                              </GlassButton>
                              <GlassButton size="small">
                                <LocationOn fontSize="small" />
                              </GlassButton>
                              <GlassButton size="small">
                                <Edit fontSize="small" />
                              </GlassButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </GlassCardDark>
            </Box>

            {/* Emergency Incidents & AI Analytics */}
            <Box sx={{ flex: 1, minWidth: 350 }}>
              <Stack spacing={3}>
                {/* Active Emergencies */}
                <GlassCardDark>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Emergency sx={{ mr: 1, color: '#f44336' }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                        Active Emergencies
                      </Typography>
                    </Box>
                    <Badge badgeContent={emergencies.filter(e => e.status === 'active').length} color="error">
                      <Notifications sx={{ color: 'rgba(255,255,255,0.6)' }} />
                    </Badge>
                  </Box>
                  
                  {emergencies.filter(e => e.status === 'active').map((emergency) => (
                    <Box key={emergency.id} sx={{ 
                      p: 2, mb: 2, borderRadius: 2,
                      background: emergency.severity === 'critical' 
                        ? 'linear-gradient(135deg, rgba(244,67,54,0.2) 0%, rgba(244,67,54,0.1) 100%)'
                        : 'rgba(255,255,255,0.05)',
                      border: emergency.severity === 'critical' 
                        ? '1px solid rgba(244,67,54,0.5)' 
                        : '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: 'white' }}>
                          {emergency.patientName}
                        </Typography>
                        <Chip 
                          label={emergency.severity.toUpperCase()}
                          size="small"
                          color={emergency.severity === 'critical' ? 'error' : 
                                 emergency.severity === 'high' ? 'error' :
                                 emergency.severity === 'medium' ? 'warning' : 'success'}
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ color: '#60a5fa', fontWeight: 600 }}>
                        {emergency.type}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                        📍 {emergency.location}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                        🕒 {emergency.timestamp} {emergency.estimatedArrival && `• ETA: ${emergency.estimatedArrival}`}
                      </Typography>
                      {emergency.status === 'active' && (
                        <GradientButton 
                          size="small" 
                          fullWidth
                          sx={{ mt: 2 }}
                          onClick={() => handleEmergencyResponse(emergency.id)}
                        >
                          <Flight sx={{ mr: 1 }} />
                          DISPATCH RESPONSE TEAM
                        </GradientButton>
                      )}
                      {emergency.responder && (
                        <Typography variant="caption" sx={{ color: '#4caf50', display: 'block', mt: 1, fontWeight: 600 }}>
                          👨‍⚕️ Responding: {emergency.responder}
                        </Typography>
                      )}
                    </Box>
                  ))}
                  
                  {emergencies.filter(e => e.status === 'active').length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <CheckCircle sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        No active emergencies
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        System monitoring normally
                      </Typography>
                    </Box>
                  )}
                </GlassCardDark>

                {/* AI-Powered Analytics */}
                <GlassCardDark>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Analytics sx={{ mr: 1, color: '#60a5fa' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                      AI Analytics
                    </Typography>
                  </Box>
                  
                  {/* Performance Metrics */}
                  <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, fontWeight: 600 }}>
                    Performance Metrics
                  </Typography>
                  {performanceData.map((metric, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.03)' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          {metric.metric}
                        </Typography>
                        <Box sx={{ 
                          width: 8, height: 8, borderRadius: '50%',
                          backgroundColor: metric.status === 'excellent' ? '#4caf50' : 
                                          metric.status === 'good' ? '#4caf50' :
                                          metric.status === 'warning' ? '#ff9800' : '#f44336'
                        }} />
                      </Box>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                        {metric.value}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        Target: {metric.target}
                      </Typography>
                    </Box>
                  ))}

                  {/* Emergency Trends Chart */}
                  <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, mt: 3, fontWeight: 600 }}>
                    Emergency Trends (Today)
                  </Typography>
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={aiAnalytics?.emergencyTrends || []}>
                      <defs>
                        <linearGradient id="emergencyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f44336" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f44336" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="hour" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.6)' }} />
                      <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.6)' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: 8,
                          color: 'white'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#f44336" 
                        fillOpacity={1} 
                        fill="url(#emergencyGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </GlassCardDark>
              </Stack>
            </Box>
          </Box>
        )}

        {/* Emergency Management Tab */}
        {activeTab === 1 && (
          <GlassCardDark>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
              Emergency Management Center
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Advanced emergency response coordination and management tools.
            </Typography>
          </GlassCardDark>
        )}

        {/* Analytics Tab */}
        {activeTab === 2 && (
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <GlassCardDark>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
                  Emergency Severity Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={severityDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {severityDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 8,
                        color: 'white'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>                </GlassCardDark>
            </Box>
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <GlassCardDark>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
                  Bed Occupancy
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bedOccupancyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {bedOccupancyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 8,
                        color: 'white'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>                </GlassCardDark>
            </Box>
          </Box>
        )}

        {/* Resources Tab */}
        {activeTab === 3 && (
          <GlassCardDark>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
              Hospital Resource Management
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Real-time resource allocation and availability tracking.
            </Typography>
          </GlassCardDark>
        )}

        {/* Management Tab */}
        {activeTab === 4 && (
          <GlassCardDark>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
              System Management & Configuration
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Advanced system settings and administrative controls.
            </Typography>
          </GlassCardDark>
        )}

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 6, py: 3 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Rescue.net AI Professional Hospital Command Center • Emergency Response Coordination • Central India Hackathon 2.0 🏥
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              Powered by Advanced AI Analytics • Real-time Monitoring • Professional Healthcare Technology
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HospitalDashboard;
