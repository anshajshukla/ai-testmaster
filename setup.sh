#!/bin/bash

# Create necessary directories
mkdir -p frontend/src/components
mkdir -p frontend/src/pages
mkdir -p frontend/src/services
mkdir -p frontend/src/utils
mkdir -p backend/src/controllers
mkdir -p backend/src/models
mkdir -p backend/src/routes
mkdir -p backend/src/services
mkdir -p backend/src/config
mkdir -p tests/ui
mkdir -p tests/api
mkdir -p tests/mobile
mkdir -p reports

# Install root dependencies
npm install

# Setup frontend
cd frontend
npm install
cd ..

# Setup backend
cd backend
npm install
cd ..

# Setup AI assistant
cd ai-assistant
pip install -r requirements.txt
cd ..

echo "Setup completed! You can now start the development servers:"
echo "1. Start backend: cd backend && npm run dev"
echo "2. Start frontend: cd frontend && npm run dev" 