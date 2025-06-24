/*
 * Modern UI Components - Reusable glassmorphism and gradient components
 * Contains common UI elements with modern design patterns
 * 
 * Built for Rescue.net AI - Central India Hackathon 2.0
 */

import React from 'react';
import { 
  Box, 
  Card, 
  Button, 
  Typography, 
  Paper, 
  BoxProps, 
  CardProps, 
  ButtonProps, 
  PaperProps,
  Skeleton,
  Divider,
  Grid,
  ChipProps
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Premium Glassmorphism Card Component
export const GlassCard = styled(Card)<CardProps>(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.17)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 45px rgba(31, 38, 135, 0.25)',
    '&::before': {
      opacity: 0.8,
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 40%)',
    opacity: 0.4,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  }
}));

// Premium Dark Glassmorphism Card
export const GlassCardDark = styled(Card)<CardProps>(({ theme }) => ({
  background: 'rgba(10, 10, 20, 0.55)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: 20,
  boxShadow: '0 10px 35px rgba(0, 0, 0, 0.5)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 45px rgba(0, 0, 0, 0.6)',
    '&::before': {
      opacity: 0.4,
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 30%)',
    opacity: 0.2,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  }
}));

// Enhanced Gradient Button
export const GradientButton = styled(Button)<ButtonProps>(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: 16,
  padding: '12px 28px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'all 0.6s ease',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 30px rgba(102, 126, 234, 0.6)',
    '&::before': {
      left: '100%'
    }
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
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.1))',
    clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)',
    opacity: 0.3,
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    '&::after': {
      opacity: 0.5,
    }
  },
}));

// Premium Glass Paper
export const GlassPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.25)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 50%)',
    opacity: 0.5,
    pointerEvents: 'none',
  }
}));

// Premium Animated Background Box
interface AnimatedBackgroundProps extends BoxProps {
  variant?: 'primary' | 'secondary' | 'success' | 'medical' | 'emergency' | 'professional';
  intensity?: 'light' | 'medium' | 'strong';
  animated?: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'primary', 
  intensity = 'medium',
  animated = true,
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
      case 'professional':
        return 'linear-gradient(-45deg, #2C3E50, #4CA1AF, #2980B9, #2C3E50)';
      default:
        return 'linear-gradient(-45deg, #667eea, #764ba2, #23a6d5, #23d5ab)';
    }
  };

  // Noise pattern overlay
  const getNoiseOpacity = () => {
    switch (intensity) {
      case 'light':
        return 0.03;
      case 'strong':
        return 0.08;
      default:
        return 0.05;
    }
  };

  return (
    <Box
      sx={{
        background: getGradient(),
        backgroundSize: '400% 400%',
        animation: animated ? 'gradient 15s ease infinite' : 'none',
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
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          opacity: getNoiseOpacity(),
          pointerEvents: 'none',
          zIndex: 1,
          mixBlendMode: 'overlay',
        },
        '& > *': {
          position: 'relative',
          zIndex: 2,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

// Enhanced Floating Element
export const FloatingElement: React.FC<BoxProps> = ({ children, sx, ...props }) => (
  <Box
    sx={{
      animation: 'floating 6s ease-in-out infinite',
      '@keyframes floating': {
        '0%': {
          transform: 'translate(0, 0px)',
        },
        '50%': {
          transform: 'translate(0, -15px)',
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

// Enhanced Pulse Element
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

// Premium Gradient Text
interface GradientTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
  gradient?: string;
  animated?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({ 
  children, 
  variant = 'h2',
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  animated = false
}) => (
  <Typography
    variant={variant}
    sx={{
      background: gradient,
      backgroundSize: animated ? '200% auto' : 'auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 'bold',
      animation: animated ? 'shine 2s linear infinite' : 'none',
      '@keyframes shine': {
        '0%': {
          backgroundPosition: '0% center',
        },
        '100%': {
          backgroundPosition: '200% center',
        },
      },
    }}
  >
    {children}
  </Typography>
);

// Premium Status Indicator with pulse
interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'error';
  size?: number;
  label?: string;
  showLabel?: boolean;
  lastUpdate?: Date | null;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  size = 12,
  label,
  showLabel = false,
  lastUpdate
}) => {
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
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: getColor(),
            animation: status === 'online' ? 'pulse 2s ease-in-out infinite' : 'none',
            boxShadow: `0 0 20px ${getColor()}`,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              borderRadius: '50%',
              border: '2px solid',
              borderColor: getColor(),
              opacity: status === 'online' ? 1 : 0,
              animation: status === 'online' ? 'ripple 1.5s ease-out infinite' : 'none',
            },
            '@keyframes ripple': {
              '0%': {
                transform: 'scale(1)',
                opacity: 1,
              },
              '100%': {
                transform: 'scale(1.5)',
                opacity: 0,
              }
            }
          }}
        />
        {(showLabel || label) && (
          <Typography variant="caption" sx={{ ml: 1, color: getColor() }}>
            {label || status}
          </Typography>
        )}
      </Box>
      {lastUpdate && (
        <Typography variant="caption" color="text.secondary">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </Typography>
      )}
    </Box>
  );
};

// Data Card with Skeleton Loading
interface DataCardProps {
  title: string;
  value: string | number | null | undefined;
  unit?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

export const DataCard: React.FC<DataCardProps> = ({ 
  title, 
  value, 
  unit, 
  loading = false,
  icon, 
  trend,
  trendValue
}) => {
  return (
    <GlassCard sx={{ height: '100%', padding: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {title}
        </Typography>
        {icon && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: 'rgba(0, 0, 0, 0.05)' 
          }}>
            {icon}
          </Box>
        )}
      </Box>
      
      {loading ? (
        <>
          <Skeleton variant="text" sx={{ fontSize: '2rem', mb: 1, width: '80%' }} />
          <Skeleton variant="text" sx={{ fontSize: '0.875rem', width: '40%' }} />
        </>
      ) : (
        <>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
            {value || '--'}{unit && <Typography component="span" variant="body1" sx={{ ml: 0.5, opacity: 0.7 }}>{unit}</Typography>}
          </Typography>
          
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Box sx={{ 
                width: 24, 
                height: 24, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: trend === 'up' 
                  ? 'rgba(240, 78, 78, 0.1)' 
                  : trend === 'down' 
                    ? 'rgba(46, 213, 115, 0.1)' 
                    : 'rgba(130, 130, 130, 0.1)',
                mr: 1
              }}>
                {trend === 'up' ? (
                  <Box sx={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '10px solid #F04E4E' }} />
                ) : trend === 'down' ? (
                  <Box sx={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '10px solid #2ED573' }} />
                ) : (
                  <Box sx={{ width: 10, height: 2, backgroundColor: '#828282' }} />
                )}
              </Box>
              <Typography variant="caption" sx={{ 
                color: trend === 'up' 
                  ? '#F04E4E'
                  : trend === 'down'
                    ? '#2ED573'
                    : '#828282'
              }}>
                {trendValue}
              </Typography>
            </Box>
          )}
        </>
      )}
    </GlassCard>
  );
};

// Premium Stat Grid
interface StatGridProps {
  items: {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: string;
  }[];
  columns?: 2 | 3 | 4;
}

export const StatGrid: React.FC<StatGridProps> = ({ items, columns = 3 }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: {
      xs: '1fr',
      sm: '1fr 1fr',
      md: `repeat(${columns}, 1fr)`
    }, gap: 3 }}>
      {items.map((item, index) => (
        <GlassCard key={index} sx={{ p: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {item.icon && (
              <Box 
                sx={{ 
                  mr: 2, 
                  p: 1.5, 
                  borderRadius: '12px',
                  background: `${item.color || '#667eea'}20`, 
                  color: item.color || '#667eea',
                  display: 'flex'
                }}
              >
                {item.icon}
              </Box>
            )}
            <Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                {item.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {item.value}
              </Typography>
            </Box>
          </Box>
        </GlassCard>
      ))}
    </Box>
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
  DataCard,
  StatGrid,
};
