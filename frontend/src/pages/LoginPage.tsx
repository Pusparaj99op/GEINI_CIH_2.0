/*
 * Login Page - User authentication for patients and hospitals
 * Provides secure login with role-based access control
 * 
 * Entry point for Rescue.net AI platform access
 */

import React, { useState } from 'react';
import {
  Box,
  Paper,
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
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  LocalHospital,
  Favorite,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, isLoading, clearError } = useAuth();
  
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    clearError();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    try {
      const userType = tabValue === 0 ? 'patient' : 'hospital';
      console.log('🔐 Login attempt:', { 
        email: formData.email, 
        password: formData.password.substring(0, 3) + '***',
        userType,
        API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api'
      });
      
      await login(formData.email, formData.password, userType);
      console.log('✅ Login successful in component');
      
      // Navigate to appropriate dashboard after successful login
      const redirectPath = userType === 'patient' ? '/patient' : '/hospital';
      console.log('🔄 Navigating to:', redirectPath);
      navigate(redirectPath);
      
    } catch (error: any) {
      console.error('❌ Login error in component:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error config:', error.config);
      // Error is handled by the auth context
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          zIndex: 0,
        },
        padding: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 450,
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
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Rescue.net
            </Typography>
          </Box>
          
          <Typography
            variant="subtitle1"
            sx={{
              color: 'rgba(0,0,0,0.8)',
              fontStyle: 'italic',
              fontWeight: 500,
              textShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            AI-Powered Emergency Response
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
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Login Forms */}
        <form onSubmit={handleSubmit}>
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6" gutterBottom>
              Patient Login
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Access your health dashboard and emergency monitoring
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Hospital Login
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Monitor patients and manage emergency responses
            </Typography>
          </TabPanel>

          {/* Email Field */}
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="username"
            value={formData.email}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            required
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ mb: 2 }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          {/* Demo Credentials */}
          <Paper sx={{ p: 2, bgcolor: '#f8f9fa', mb: 2 }}>
            <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
              Demo Credentials:
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
              <strong>{tabValue === 0 ? 'Patient' : 'Hospital'}:</strong><br />
              {tabValue === 0 ? 'Phone: 9876543210' : 'Email: demo@hospital.com'}<br />
              Password: {tabValue === 0 ? 'patient123' : 'hospital123'}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => {
                if (tabValue === 0) {
                  setFormData({ email: '9876543210', password: 'patient123' });
                } else {
                  setFormData({ email: 'demo@hospital.com', password: 'hospital123' });
                }
              }}
            >
              Use Demo Credentials
            </Button>
          </Paper>
        </form>

        <Divider sx={{ my: 2 }} />

        {/* Register Link */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" color="primary">
              Register here
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <Link component={RouterLink} to="/" color="primary">
              ← Back to Home
            </Link>
          </Typography>
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="caption" color="text.disabled">
            Central India Hackathon 2.0
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
