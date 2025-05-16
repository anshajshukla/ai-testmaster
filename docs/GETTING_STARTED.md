# Getting Started with AI-TestMaster

## Step 1: Environment Setup

### Install Required Software
1. **Node.js and npm**
   - Download from [nodejs.org](https://nodejs.org/)
   - Choose LTS version
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation:
     ```bash
     git --version
     ```

3. **VS Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)
   - Recommended extensions:
     - ESLint
     - Prettier
     - JavaScript and TypeScript
     - Material Icon Theme

## Step 2: Project Setup

### Clone the Repository
```bash
git clone <repository-url>
cd ai-testmaster
```

### Install Dependencies
1. **Frontend**
   ```bash
   cd frontend
   npm install
   ```

2. **Backend**
   ```bash
   cd ../backend
   npm install
   ```

### Configure Environment
1. Create `.env` files:
   - Frontend: `frontend/.env`
   - Backend: `backend/.env`

2. Add required environment variables:
   ```
   # Frontend
   VITE_API_URL=http://localhost:3000

   # Backend
   PORT=3000
   NODE_ENV=development
   ```

## Step 3: Start Development

### Start Backend Server
```bash
cd backend
npm run dev
```

### Start Frontend Server
```bash
cd frontend
npm run dev
```

## Step 4: Project Structure Understanding

### Frontend Structure
```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
├── public/            # Static files
└── package.json       # Dependencies
```

### Backend Structure
```
backend/
├── src/
│   ├── routes/        # API routes
│   ├── controllers/   # Route controllers
│   ├── models/        # Data models
│   └── index.js       # Entry point
└── package.json       # Dependencies
```

## Step 5: Key Features Implementation

### 1. UPI Payment System
- Located in `frontend/src/pages/UPI.jsx`
- Features:
  - UPI ID validation
  - Payment processing
  - Success/failure handling

### 2. Credit Card Payment
- Located in `frontend/src/pages/Payment.jsx`
- Features:
  - Card validation
  - Payment processing
  - Security measures

### 3. Dashboard
- Located in `frontend/src/pages/Dashboard.jsx`
- Features:
  - Quick actions
  - Transaction history
  - Real-time updates

## Step 6: Testing

### Run Tests
1. **Frontend Tests**
   ```bash
   cd frontend
   npm test
   ```

2. **Backend Tests**
   ```bash
   cd backend
   npm test
   ```

## Step 7: Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/new-feature
```

### 2. Make Changes
- Follow coding standards
- Write tests
- Update documentation

### 3. Commit Changes
```bash
git add .
git commit -m "Description of changes"
```

### 4. Push Changes
```bash
git push origin feature/new-feature
```

## Step 8: Common Issues and Solutions

### 1. Port Already in Use
- Solution: Kill the process using the port
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F

  # Mac/Linux
  lsof -i :3000
  kill -9 <PID>
  ```

### 2. Module Not Found
- Solution: Check import paths
- Verify package installation
- Clear node_modules and reinstall

### 3. CORS Issues
- Solution: Check backend CORS configuration
- Verify API URL in frontend

## Step 9: Learning Resources

### 1. React
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Router](https://reactrouter.com/docs/en/v6)
- [Material-UI](https://mui.com/getting-started/usage/)

### 2. Node.js/Express
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/guide/routing.html)

### 3. Testing
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Step 10: Next Steps

1. **Enhance Features**
   - Add more payment methods
   - Implement user profiles
   - Add analytics

2. **Improve Testing**
   - Add more test cases
   - Implement E2E testing
   - Add performance testing

3. **Optimize Performance**
   - Implement code splitting
   - Add caching
   - Optimize bundle size

4. **Security**
   - Add input validation
   - Implement rate limiting
   - Add security headers

Remember to:
- Write clean, maintainable code
- Document your changes
- Write tests for new features
- Follow best practices
- Ask for help when needed 