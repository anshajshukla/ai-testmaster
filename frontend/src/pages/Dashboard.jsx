import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  QrCode2 as QrCodeIcon,
  History as HistoryIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  AccountBalance as AccountIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Simulate loading data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleNavigation = (path) => {
    try {
      navigate(path);
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Navigation failed. Please try again.',
        severity: 'error'
      });
    }
  };

  const quickActions = [
    {
      title: 'Pay with UPI',
      description: 'Make instant payments using UPI',
      icon: <QrCodeIcon sx={{ fontSize: 40 }} />,
      action: () => handleNavigation('/upi'),
      color: '#1976d2',
    },
    {
      title: 'Credit Card Payment',
      description: 'Pay your credit card bills',
      icon: <PaymentIcon sx={{ fontSize: 40 }} />,
      action: () => handleNavigation('/payment'),
      color: '#2e7d32',
    },
    {
      title: 'View Transactions',
      description: 'Check your payment history',
      icon: <HistoryIcon sx={{ fontSize: 40 }} />,
      action: () => handleNavigation('/transactions'),
      color: '#ed6c02',
    },
  ];

  const upiFeatures = [
    {
      title: 'Secure Payments',
      description: 'End-to-end encrypted transactions',
      icon: <SecurityIcon />,
    },
    {
      title: 'Instant Transfer',
      description: 'Real-time payment processing',
      icon: <SpeedIcon />,
    },
    {
      title: 'Easy to Use',
      description: 'Simple and intuitive interface',
      icon: <AccountIcon />,
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to AI-TestMaster
      </Typography>

      {/* UPI Information Section */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: '#f5f5f5' }}>
        <Typography variant="h6" gutterBottom>
          UPI Payment System
        </Typography>
        <Typography variant="body1" paragraph>
          UPI (Unified Payments Interface) is a real-time payment system that allows instant money transfers between bank accounts. It's secure, fast, and easy to use.
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {upiFeatures.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {feature.icon}
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                  {feature.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          startIcon={<QrCodeIcon />}
          onClick={() => handleNavigation('/upi')}
          sx={{ mt: 2 }}
        >
          Try UPI Payment
        </Button>
      </Paper>

      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: action.color, mr: 1 }}>
                    {action.icon}
                  </Box>
                  <Typography variant="h6">
                    {action.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={action.action}
                  sx={{ color: action.color }}
                >
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Recent Activity
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Your recent transactions will appear here. All transactions are simulated for testing purposes.
        </Typography>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard; 