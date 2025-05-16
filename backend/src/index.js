const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// Mock data
const users = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'testpassword123',
  },
];

const cards = [
  {
    id: 1,
    last4: '4242',
    expiryMonth: '12',
    expiryYear: '2025',
  },
  {
    id: 2,
    last4: '5678',
    expiryMonth: '06',
    expiryYear: '2024',
  },
];

const transactions = [
  {
    id: 1,
    description: 'Credit Card Payment',
    amount: -5000,
    date: '2024-02-15',
  },
  {
    id: 2,
    description: 'Cashback Reward',
    amount: 250,
    date: '2024-02-14',
  },
  {
    id: 3,
    description: 'Credit Card Payment',
    amount: -3000,
    date: '2024-02-10',
  },
  {
    id: 4,
    description: 'Cashback Reward',
    amount: 150,
    date: '2024-02-09',
  },
  {
    id: 5,
    description: 'Credit Card Payment',
    amount: -2000,
    date: '2024-02-05',
  },
];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes
app.use('/api/auth', authRoutes);

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1h' }
  );

  res.json({ token });
});

app.get('/verify-token', authenticateToken, (req, res) => {
  res.json({ valid: true });
});

app.get('/credit-score', authenticateToken, (req, res) => {
  res.json({ score: 750 });
});

app.get('/cards', authenticateToken, (req, res) => {
  res.json(cards);
});

app.get('/transactions', authenticateToken, (req, res) => {
  res.json(transactions);
});

app.post('/pay-bill', authenticateToken, (req, res) => {
  const { cardId, amount } = req.body;

  if (!cardId || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Simulate random success/failure
  const success = Math.random() > 0.2;

  if (success) {
    transactions.unshift({
      id: transactions.length + 1,
      description: 'Credit Card Payment',
      amount: -amount,
      date: new Date().toISOString().split('T')[0],
    });
    res.json({ success: true, message: 'Payment successful' });
  } else {
    res.status(500).json({ success: false, message: 'Payment failed' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: 'Internal Server Error',
      code: 'INTERNAL_ERROR'
    }
  });
});

const startServer = async (port) => {
  try {
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is in use, trying ${port + 1}...`);
        server.close();
        setTimeout(() => {
          startServer(port + 1);
        }, 1000);
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });

    // Handle process termination
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Closing server...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received. Closing server...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start with a random port if 3000 is in use
const initialPort = process.env.PORT || 3000;
startServer(initialPort); 