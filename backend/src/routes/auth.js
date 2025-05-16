const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock user data (replace with database in production)
const users = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'password123', // In production, use hashed passwords
  },
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      error: {
        message: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS',
      },
    });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'your_jwt_secret_here',
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router; 