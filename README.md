# AI-TestMaster

A full-stack testing automation project inspired by CRED, featuring a mock fintech application with UPI and credit card payment systems.

## Features

- 🔐 Secure Authentication
- 💳 Credit Card Payments
- 📱 UPI Payments
- 📊 Transaction History
- 🎨 Modern UI with Material-UI
- 🔄 Real-time Updates

## Tech Stack

### Frontend
- React.js
- Material-UI
- Vite
- React Router

### Backend
- Node.js
- Express.js
- Nodemon

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-testmaster.git
cd ai-testmaster
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Configure environment variables
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:3000

# Backend (.env)
PORT=3000
NODE_ENV=development
```

4. Start development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm run dev
```

## Deployment

### Frontend (Vercel/Netlify)
1. Push your code to GitHub
2. Connect your repository to Vercel/Netlify
3. Configure build settings:
   - Build command: `cd frontend && npm install && npm run build`
   - Output directory: `frontend/dist`
   - Environment variables: Add your API URL

### Backend (Railway/Render)
1. Push your code to GitHub
2. Connect your repository to Railway/Render
3. Configure environment variables
4. Set the start command: `cd backend && npm install && npm start`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by CRED
- Built with React and Material-UI
- Powered by Node.js and Express 