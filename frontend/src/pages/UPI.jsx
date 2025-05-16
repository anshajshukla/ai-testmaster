import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Payment as PaymentIcon, QrCode2 as QrCodeIcon } from '@mui/icons-material';

const steps = ['Enter UPI ID', 'Verify', 'Complete Payment'];

const UPI = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Mock UPI IDs for demonstration
  const mockUpiIds = [
    'user@upi',
    'test@upi',
    'demo@upi',
  ];

  const handleNext = () => {
    if (activeStep === 0) {
      if (!upiId) {
        setError('Please enter a UPI ID');
        return;
      }
      if (!mockUpiIds.includes(upiId)) {
        setError('Invalid UPI ID. Try: user@upi, test@upi, or demo@upi');
        return;
      }
      setError('');
    }
    if (activeStep === 1) {
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        setError('Please enter a valid amount');
        return;
      }
      setError('');
    }
    if (activeStep === steps.length - 1) {
      setSuccess(true);
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              For testing, use one of these UPI IDs:
              {mockUpiIds.map((id) => (
                <Box key={id} component="span" sx={{ ml: 1 }}>
                  {id}
                </Box>
              ))}
            </Typography>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              You are paying to: {upiId}
            </Typography>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payment Summary
                </Typography>
                <Typography>
                  Amount: ₹{amount}
                </Typography>
                <Typography>
                  To: {upiId}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  This is a simulated payment. No actual transaction will occur.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <PaymentIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Your payment of ₹{amount} to {upiId} has been processed successfully.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setSuccess(false);
              setActiveStep(0);
              setUpiId('');
              setAmount('');
            }}
          >
            Make Another Payment
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          UPI Payment
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? 'Pay Now' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UPI; 