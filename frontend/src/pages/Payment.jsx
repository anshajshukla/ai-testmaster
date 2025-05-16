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
import { Payment as PaymentIcon } from '@mui/icons-material';

const steps = ['Card Details', 'Verify', 'Complete Payment'];

const Payment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleNext = () => {
    if (activeStep === 0) {
      if (!cardNumber || !expiryDate || !cvv) {
        setError('Please fill in all card details');
        return;
      }
      if (cardNumber.length !== 16) {
        setError('Card number must be 16 digits');
        return;
      }
      if (cvv.length !== 3) {
        setError('CVV must be 3 digits');
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
              label="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
              placeholder="1234 5678 9012 3456"
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="MM/YY"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  placeholder="123"
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              For testing, use any 16-digit card number, future expiry date, and 3-digit CVV
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
              Card ending in: {cardNumber.slice(-4)}
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
                  Card: **** **** **** {cardNumber.slice(-4)}
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
            Your payment of ₹{amount} has been processed successfully.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setSuccess(false);
              setActiveStep(0);
              setCardNumber('');
              setExpiryDate('');
              setCvv('');
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
          Credit Card Payment
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

export default Payment; 