/*
 * Modern UI Components - Reusable glassmorphism and gradient components
 * Contains common UI elements with modern design patterns
 * 
 * Built for Rescue.net AI - Central India Hackathon 2.0
 */

import React from 'react';
import { Box, Card, Button, Typography, Paper, BoxProps, CardProps, ButtonProps, PaperProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Glassmorphism Card Component
export const GlassCard = styled(Card)<CardProps>(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(31, 38, 135, 0.4)',
  },
}));

// Dark Glassmorphism Card
export const GlassCardDark = styled(Card)<CardProps>(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
  },
}));

// Gradient Button
export const GradientButton = styled(Button)<ButtonProps>(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: 16,
  padding: '12px 28px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(31, 38, 135, 0.4)',
  },
}));

// Glass Button
export const GlassButton = styled(Button)<ButtonProps>(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 16,
  padding: '12px 28px',
  fontWeight: 600,
  textTransform: 'none',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    transform: 'translateY(-2px)',
  },
}));

// Glass Paper
export const GlassPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
}));

// Animated Background Box
interface AnimatedBackgroundProps extends BoxProps {
  variant?: 'primary' | 'secondary' | 'success' | 'medical' | 'emergency';
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'primary', 
  children, 
  sx,
  ...props 
}) => {
  const getGradient = () => {
    switch (variant) {
      case 'secondary':
        return 'linear-gradient(-45deg, #f093fb, #f5576c, #ff9a9e, #fecfef)';
      case 'success':
        return 'linear-gradient(-45deg, #4facfe, #00f2fe, #43e97b, #38f9d7)';
      case 'medical':
        return 'linear-gradient(-45deg, #a8edea, #fed6e3, #d299c2, #fef9d7)';
      case 'emergency':
        return 'linear-gradient(-45deg, #ff9a9e, #fecfef, #ffecd2, #fcb69f)';
      default:
        return 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
    }
  };

  return (
    <Box
      sx={{
        background: getGradient(),
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        '@keyframes gradient': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

// Floating Element
export const FloatingElement: React.FC<BoxProps> = ({ children, sx, ...props }) => (
  <Box
    sx={{
      animation: 'floating 6s ease-in-out infinite',
      '@keyframes floating': {
        '0%': {
          transform: 'translate(0, 0px)',
        },
        '50%': {
          transform: 'translate(0, -20px)',
        },
        '100%': {
          transform: 'translate(0, 0px)',
        },
      },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

// Pulse Element
export const PulseElement: React.FC<BoxProps> = ({ children, sx, ...props }) => (
  <Box
    sx={{
      animation: 'pulse 2s ease-in-out infinite',
      '@keyframes pulse': {
        '0%': {
          transform: 'scale(1)',
          opacity: 1,
        },
        '50%': {
          transform: 'scale(1.05)',
          opacity: 0.8,
        },
        '100%': {
          transform: 'scale(1)',
          opacity: 1,
        },
      },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

// Gradient Text
interface GradientTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
  gradient?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({ 
  children, 
  variant = 'h2',
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}) => (
  <Typography
    variant={variant}
    sx={{
      background: gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 'bold',
    }}
  >
    {children}
  </Typography>
);

// Status Indicator with pulse
interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'error';
  size?: number;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, size = 12 }) => {
  const getColor = () => {
    switch (status) {
      case 'online':
        return '#4dd0e1';
      case 'warning':
        return '#ffa726';
      case 'error':
        return '#ff6b6b';
      default:
        return '#bdbdbd';
    }
  };

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: getColor(),
        animation: status === 'online' ? 'pulse 2s ease-in-out infinite' : 'none',
        boxShadow: `0 0 20px ${getColor()}`,
      }}
    />
  );
};

export default {
  GlassCard,
  GlassCardDark,
  GradientButton,
  GlassButton,
  GlassPaper,
  AnimatedBackground,
  FloatingElement,
  PulseElement,
  GradientText,
  StatusIndicator,
};
