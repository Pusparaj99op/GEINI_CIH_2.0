/*
 * Modern Registration Page - Enhanced user registration with glassmorphism design
 * New user registration for patients and hospitals with beautiful UI
 * 
 * Built for Central India Hackathon 2.0 - Emergency Response System
 */

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
  Alert,
  InputAdornment,
  IconButton,
  Link,
  Divider,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  LocalHospital,
  Favorite,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GlassCard, 
  GlassPaper, 
  GradientText, 
  AnimatedBackground,
  GradientButton
} from '../components/ModernUI';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const STATES = [
  'Madhya Pradesh', 'Maharashtra', 'Uttar Pradesh', 'Gujarat', 'Rajasthan',
  'Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Bihar'
];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, error, isLoading, clearError } = useAuth();
  
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Patient form data
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    bloodGroup: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
    },
    emergencyContacts: [{
      name: '',
      relationship: '',
      phone: '',
    }],
  });

  // Hospital form data
  const [hospitalData, setHospitalData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    registrationNumber: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
    },
    specializations: [] as string[],
    capacity: '',
    emergencyServices: true,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    clearError();
  };

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (patientData.password !== patientData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      await register(patientData, 'patient');
      navigate('/patient');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleHospitalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hospitalData.password !== hospitalData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      await register(hospitalData, 'hospital');
      navigate('/hospital');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <AnimatedBackground variant="primary" sx={{ minHeight: '100vh' }}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: 2,
        }}
      >
        <GlassPaper
          elevation={0}
          sx={{
            maxWidth: 500,
            width: '100%',
            padding: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Back Button */}
          <Box sx={{ mb: 2 }}>
            <IconButton 
              onClick={() => navigate('/')}
              sx={{ 
                color: 'rgba(0,0,0,0.8)',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                }
              }}
            >
              <ArrowBack />
            </IconButton>
          </Box>

          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                p: 2,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                mx: 'auto',
                width: 'fit-content',
              }}
            >
              <Favorite 
                sx={{ 
                  fontSize: 40, 
                  color: '#ff6b6b',
                  mr: 1,
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                }} 
              />
              <GradientText variant="h4">
                Join Rescue.net
              </GradientText>
            </Box>
            
            <Typography
              variant="subtitle1"
              sx={{
                color: 'rgba(0,0,0,0.8)',
                fontWeight: 500,
                textShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              Create your account and start saving lives
            </Typography>
          </Box>

          {/* User Type Tabs */}
          <Box 
            sx={{ 
              mb: 3,
              p: 1,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ 
                '& .MuiTab-root': {
                  borderRadius: 2,
                  margin: 0.5,
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(10px)',
                    color: '#667eea',
                  },
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab
                icon={<Person />}
                label="Patient"
                iconPosition="start"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              />
              <Tab
                icon={<LocalHospital />}
                label="Hospital"
                iconPosition="start"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              />
            </Tabs>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                background: 'rgba(255, 107, 107, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 107, 107, 0.3)',
              }}
              onClose={clearError}
            >
              {error}
            </Alert>
          )}

          {/* Patient Registration */}
          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handlePatientSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={patientData.name}
                  onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    label="Age"
                    type="number"
                    value={patientData.age}
                    onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                      }
                    }}
                  />

                  <TextField
                    select
                    label="Gender"
                    value={patientData.gender}
                    onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                      }
                    }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Box>

                <TextField
                  select
                  fullWidth
                  label="Blood Group"
                  value={patientData.bloodGroup}
                  onChange={(e) => setPatientData({ ...patientData, bloodGroup: e.target.value })}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                >
                  {BLOOD_GROUPS.map((group) => (
                    <MenuItem key={group} value={group}>
                      {group}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  label="Phone Number"
                  value={patientData.phone}
                  onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={patientData.email}
                  onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={patientData.password}
                  onChange={(e) => setPatientData({ ...patientData, password: e.target.value })}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={patientData.confirmPassword}
                  onChange={(e) => setPatientData({ ...patientData, confirmPassword: e.target.value })}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                />

                <GradientButton
                  type="submit"
                  fullWidth
                  size="large"
                  disabled={isLoading}
                  sx={{ mt: 3 }}
                >
                  {isLoading ? 'Creating Account...' : 'Create Patient Account'}
                </GradientButton>
              </Stack>
            </form>
          </TabPanel>

          {/* Hospital Registration */}
          <TabPanel value={tabValue} index={1}>
            <form onSubmit={handleHospitalSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Hospital Name"
                  value={hospitalData.name}
                  onChange={(e) => setHospitalData({ ...hospitalData, name: e.target.value })}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Registration Number"
                  value={hospitalData.registrationNumber}
                  onChange={(e) => setHospitalData({ ...hospitalData, registrationNumber: e.target.value })}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={hospitalData.email}
                  onChange={(e) => setHospitalData({ ...hospitalData, email: e.target.value })}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Phone Number"
                  value={hospitalData.phone}
                  onChange={(e) => setHospitalData({ ...hospitalData, phone: e.target.value })}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Hospital Capacity"
                  type="number"
                  value={hospitalData.capacity}
                  onChange={(e) => setHospitalData({ ...hospitalData, capacity: e.target.value })}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={hospitalData.password}
                  onChange={(e) => setHospitalData({ ...hospitalData, password: e.target.value })}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={hospitalData.confirmPassword}
                  onChange={(e) => setHospitalData({ ...hospitalData, confirmPassword: e.target.value })}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }
                  }}
                />

                <GradientButton
                  type="submit"
                  fullWidth
                  size="large"
                  disabled={isLoading}
                  sx={{ mt: 3 }}
                >
                  {isLoading ? 'Creating Account...' : 'Create Hospital Account'}
                </GradientButton>
              </Stack>
            </form>
          </TabPanel>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)' }}>
              Already have an account?{' '}
              <Link 
                component={RouterLink} 
                to="/login" 
                sx={{ 
                  color: '#667eea', 
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </GlassPaper>
      </Box>
    </AnimatedBackground>
  );
};

export default RegisterPage;
