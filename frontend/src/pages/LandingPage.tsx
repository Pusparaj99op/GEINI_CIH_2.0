/*
 * Landing Page - Welcome page for Rescue.net AI platform
 * Showcases platform features and provides entry points
 * 
 * Central India Hackathon 2.0 - Emergency Response System
 */

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Chip,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import {
  Favorite,
  MonitorHeart,
  Emergency,
  LocationOn,
  Smartphone,
  Cloud,
  Analytics,
  ArrowForward,
  PlayArrow,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <MonitorHeart color="primary" sx={{ fontSize: 40 }} />,
      title: 'Real-time Health Monitoring',
      description: 'Continuous monitoring of vital signs with AI-powered analysis'
    },
    {
      icon: <Emergency color="secondary" sx={{ fontSize: 40 }} />,
      title: 'Emergency Prediction',
      description: 'Predictive AI alerts before emergencies occur'
    },
    {
      icon: <LocationOn color="primary" sx={{ fontSize: 40 }} />,
      title: 'GPS Tracking',
      description: 'Instant location sharing for emergency response'
    },
    {
      icon: <Smartphone color="primary" sx={{ fontSize: 40 }} />,
      title: 'Smart Wearable',
      description: 'Custom IoT device with 24+ hour battery life'
    },
    {
      icon: <Cloud color="primary" sx={{ fontSize: 40 }} />,
      title: 'Cloud Integration',
      description: 'Secure data sync with offline capability'
    },
    {
      icon: <Analytics color="primary" sx={{ fontSize: 40 }} />,
      title: 'AI Analytics',
      description: 'Machine learning for health pattern recognition'
    }
  ];

  const stats = [
    { number: '<1s', label: 'Response Time' },
    { number: '24+hrs', label: 'Battery Life' },
    { number: '99.9%', label: 'Accuracy' },
    { number: '24/7', label: 'Monitoring' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Header */}
      <AppBar 
        position="fixed" 
        elevation={0} 
        sx={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                p: 1,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                mr: 2
              }}
            >
              <Favorite sx={{ color: '#ff6b6b', mr: 1, fontSize: 32 }} />
              <Typography variant="h5" component="div" sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold' 
              }}>
                Rescue.net AI
              </Typography>
            </Box>
            <Chip 
              label="CIH 2.0" 
              size="small" 
              sx={{ 
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(135deg, #e73c7e 0%, #f5576c 100%)',
                }
              }}
            />
          </Box>
          <Button 
            variant="outlined" 
            sx={{ 
              mr: 2,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
              }
            }}
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
          <Button 
            variant="contained" 
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                transform: 'translateY(-2px)',
              }
            }}
            onClick={() => navigate('/register')}
          >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          pt: 12,
          pb: 8,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
            zIndex: -1,
          }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  animation: 'floating 6s ease-in-out infinite',
                  color: 'white',
                  background: 'none',
                  WebkitTextFillColor: 'white',
                }}
              >
                India's First Predictive Emergency Response Ecosystem
              </Typography>
              <Typography 
                variant="h6" 
                paragraph 
                sx={{ 
                  opacity: 0.95,
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  lineHeight: 1.6,
                }}
              >
                Revolutionary AI-powered wearable technology that predicts health emergencies 
                and coordinates instant response to save lives across India.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(20px)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    '&:hover': { 
                      background: 'rgba(255, 255, 255, 0.3)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    }
                  }}
                  startIcon={<PlayArrow />}
                  onClick={() => navigate('/login')}
                >
                  Try Demo
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderColor: 'rgba(255, 255, 255, 0.5)', 
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': { 
                      borderColor: 'rgba(255, 255, 255, 0.8)', 
                      background: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-3px)',
                    }
                  }}
                  onClick={() => navigate('/register')}
                >
                  Learn More
                </Button>
              </Stack>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Box
                className="floating-element"
                sx={{
                  width: { xs: 250, md: 350 },
                  height: { xs: 250, md: 350 },
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -50,
                    left: -50,
                    width: '200%',
                    height: '200%',
                    background: 'conic-gradient(transparent, rgba(255, 255, 255, 0.3), transparent)',
                    animation: 'spin 4s linear infinite',
                  },
                  '@keyframes spin': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                  },
                }}
              >
                <MonitorHeart 
                  className="pulse-animation"
                  sx={{ 
                    fontSize: { xs: 100, md: 140 }, 
                    color: 'white',
                    zIndex: 1,
                    filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))',
                  }} 
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 2 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-around' }}>
            {stats.map((stat, index) => (
              <Box 
                key={index} 
                sx={{ 
                  textAlign: 'center', 
                  minWidth: 120,
                  p: 2,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    background: 'rgba(255, 255, 255, 0.4)',
                  }
                }}
              >
                <Typography 
                  variant="h3" 
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold'
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.8)', fontWeight: 500 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Cutting-Edge Healthcare Technology
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            Advanced AI algorithms combined with IoT sensors for comprehensive health monitoring 
            and emergency prediction
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {features.map((feature, index) => (
            <Card 
              key={index} 
              sx={{ 
                maxWidth: 300, 
                textAlign: 'center', 
                p: 3, 
                flex: '1 1 300px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px) scale(1.02)',
                  background: 'rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                },
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box 
                  sx={{ 
                    mb: 3,
                    p: 2,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                  }}
                >
                  {React.cloneElement(feature.icon, { 
                    sx: { 
                      fontSize: 40, 
                      color: 'white',
                      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                    } 
                  })}
                </Box>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'white',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Demo Section */}
      <Box 
        sx={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          py: 8,
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6 }}>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h3" 
                gutterBottom 
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                Try the Demo Now
              </Typography>
              <Typography 
                variant="h6" 
                paragraph 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}
              >
                Experience the power of predictive healthcare technology with our 
                interactive demo featuring real-time data simulation.
              </Typography>
              
              <Box sx={{ mt: 4 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  Demo Credentials:
                </Typography>
                <Paper 
                  sx={{ 
                    p: 3, 
                    mb: 3,
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 3,
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{ color: 'white' }}
                  >
                    Patient Dashboard:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Phone: <Box component="strong" sx={{ color: 'white' }}>9876543210</Box><br />
                    Password: <Box component="strong" sx={{ color: 'white' }}>patient123</Box>
                  </Typography>
                </Paper>
                <Paper 
                  sx={{ 
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 3,
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{ color: 'white' }}
                  >
                    Hospital Dashboard:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Email: <Box component="strong" sx={{ color: 'white' }}>demo@hospital.com</Box><br />
                    Password: <Box component="strong" sx={{ color: 'white' }}>hospital123</Box>
                  </Typography>
                </Paper>
              </Box>

              <Button 
                variant="contained" 
                size="large" 
                sx={{ 
                  mt: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                  }
                }}
                endIcon={<ArrowForward />}
                onClick={() => navigate('/login')}
              >
                Access Demo
              </Button>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Stack spacing={3}>
                {[
                  'Real-time health data simulation',
                  'Emergency alert testing', 
                  'AI prediction analysis',
                  'Hospital coordination system'
                ].map((text, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      p: 2,
                      borderRadius: 3,
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.25)',
                        transform: 'translateX(10px)',
                      }
                    }}
                  >
                    <CheckCircle sx={{ color: '#4dd0e1', mr: 2, fontSize: 28 }} />
                    <Typography sx={{ color: 'white', fontWeight: 500 }}>
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white', 
          py: 8,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
            zIndex: -1,
          }
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            Ready to Save Lives with AI?
          </Typography>
          <Typography 
            variant="h6" 
            paragraph 
            sx={{ 
              opacity: 0.9,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            Join the revolution in emergency healthcare response
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="center" 
            sx={{ mt: 4 }}
          >
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': { 
                  background: 'rgba(255, 255, 255, 0.3)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                }
              }}
              onClick={() => navigate('/register')}
            >
              Sign Up Now
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                borderColor: 'rgba(255, 255, 255, 0.5)', 
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                '&:hover': { 
                  borderColor: 'rgba(255, 255, 255, 0.8)', 
                  background: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-3px)',
                }
              }}
              onClick={() => navigate('/login')}
            >
              Try Demo
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        sx={{ 
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white', 
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 1,
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    mr: 2
                  }}
                >
                  <Favorite sx={{ color: '#ff6b6b', mr: 1, fontSize: 28 }} />
                  <Typography 
                    variant="h6" 
                    sx={{
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Rescue.net AI
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                Developed for Central India Hackathon 2.0<br />
                Revolutionizing emergency healthcare with AI and IoT
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Contact
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                Emergency Response System<br />
                Built with ❤️ for saving lives
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              opacity: 0.6,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              p: 2,
              borderRadius: 2,
            }}
          >
            © 2025 Rescue.net AI. Built for Central India Hackathon 2.0
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
