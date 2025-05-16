# AI Test Maker

A full-stack application for managing test cases and payments.

## Project Structure

```
ai-testmaker/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── pages/     # Page components
│   │   ├── App.jsx    # Main application component
│   │   └── main.jsx   # Application entry point
│   └── package.json   # Frontend dependencies
│
├── backend/           # Node.js backend application
│   ├── src/
│   │   └── index.js   # Server entry point
│   └── package.json   # Backend dependencies
│
└── README.md         # Project documentation
```

## Features

- User authentication
- Payment processing
- Transaction history
- Test case management

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/anshajshukla/ai-testmaker.git
cd ai-testmaker
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Start the development servers:

In one terminal:
```bash
cd backend
npm run dev
```

In another terminal:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Vite
  - React Router

- Backend:
  - Node.js
  - Express
  - MongoDB

## License

MIT License 