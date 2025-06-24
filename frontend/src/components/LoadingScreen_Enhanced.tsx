/*
 * Enhanced Loading Screen - Modern loading experience with glassmorphism
 * Provides branded loading experience for Rescue.net AI platform
 * 
 * Built for Central India Hackathon 2.0 - Emergency Response System
 */

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Favorite, MonitorHeart } from '@mui/icons-material';
import { AnimatedBackground, GlassCard, GradientText, PulseElement } from './ModernUI';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading Rescue.net AI...' 
}) => {
  return (
    <AnimatedBackground variant="primary" sx={{ minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 3,
        }}
      >
        <GlassCard
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 400,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* Logo/Brand */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 3,
              p: 2,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <PulseElement>
              <Favorite 
                sx={{ 
                  fontSize: 48, 
                  color: '#ff6b6b',
                  mr: 1,
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                }} 
              />
            </PulseElement>
            <GradientText variant="h4">
              Rescue.net AI
            </GradientText>
          </Box>

          {/* Loading Animation */}
          <Box sx={{ position: 'relative', mb: 3 }}>
            <CircularProgress 
              size={80}
              thickness={4}
              sx={{
                color: '#667eea',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PulseElement>
                <MonitorHeart sx={{ fontSize: 32, color: '#ff6b6b' }} />
              </PulseElement>
            </Box>
          </Box>

          {/* Loading Message */}
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(0,0,0,0.8)',
              fontWeight: 500,
              mb: 1,
            }}
          >
            {message}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(0,0,0,0.6)',
              fontStyle: 'italic',
            }}
          >
            Initializing emergency response system...
          </Typography>

          {/* Progress Dots */}
          <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
            {[1, 2, 3].map((dot) => (
              <Box
                key={dot}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  animation: `pulse 1.5s ease-in-out infinite`,
                  animationDelay: `${dot * 0.3}s`,
                  '@keyframes pulse': {
                    '0%, 80%, 100%': {
                      transform: 'scale(0)',
                      opacity: 0.5,
                    },
                    '40%': {
                      transform: 'scale(1)',
                      opacity: 1,
                    },
                  },
                }}
              />
            ))}
          </Box>
        </GlassCard>
      </Box>
    </AnimatedBackground>
  );
};

export default LoadingScreen;
