#!/bin/bash

# Development environment setup and run script

echo "🚀 Setting up byNolo development environment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Set up backend virtual environment
echo "🐍 Setting up Python virtual environment..."
if [ ! -d "api/venv" ]; then
    cd api
    python3 -m venv venv
    cd ..
fi

# Activate virtual environment and install backend dependencies
echo "📦 Installing backend dependencies..."
cd api
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Copy environment file
if [ ! -f "api/.env" ]; then
    echo "📄 Creating backend environment file..."
    cp api/.env.example api/.env
    echo "⚠️  Please update api/.env with your configuration"
fi

echo "✅ Development environment ready!"
echo ""
echo "🚀 To start development:"
echo "1. Frontend: npm run dev"
echo "2. Backend: cd api && source venv/bin/activate && python run.py"
echo ""
echo "📚 API will be available at: http://localhost:5000"
echo "🌐 Frontend will be available at: http://localhost:5173"
