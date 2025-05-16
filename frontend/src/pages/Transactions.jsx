import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { Payment as PaymentIcon, QrCode2 as QrCodeIcon } from '@mui/icons-material';

const mockTransactions = [
  {
    id: 1,
    type: 'UPI Payment',
    amount: '₹2,000.00',
    recipient: 'user@upi',
    date: '2024-03-16 14:30',
    status: 'Completed',
    icon: <QrCodeIcon />,
  },
  {
    id: 2,
    type: 'Credit Card Payment',
    amount: '₹5,000.00',
    recipient: 'Credit Card Bill',
    date: '2024-03-15 10:15',
    status: 'Completed',
    icon: <PaymentIcon />,
  },
  {
    id: 3,
    type: 'UPI Payment',
    amount: '₹1,500.00',
    recipient: 'test@upi',
    date: '2024-03-14 16:45',
    status: 'Completed',
    icon: <QrCodeIcon />,
  },
];

const Transactions = () => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transaction History
      </Typography>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Recipient</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {transaction.icon}
                      <Typography sx={{ ml: 1 }}>{transaction.type}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.recipient}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.status}
                      color={getStatusColor(transaction.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Transaction Information
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • All transactions are simulated for testing purposes
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • UPI transactions use mock UPI IDs (user@upi, test@upi, demo@upi)
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Credit card payments use simulated card details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • No actual money is transferred in any transaction
        </Typography>
      </Paper>
    </Container>
  );
};

export default Transactions; 