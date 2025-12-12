#!/bin/bash

# One-command installer and runner for CommunityHub
# Usage: curl -fsSL https://raw.githubusercontent.com/MODAN88/CommunityHub/main/run.sh | bash

echo ""
echo "════════════════════════════════════════════"
echo "    🏘️  CommunityHub - Quick Launcher"
echo "════════════════════════════════════════════"
echo ""

# Navigate to project directory if not already there
if [ ! -f "package.json" ]; then
    echo "Error: Please run this from the project root directory"
    exit 1
fi

# Install if needed
if [ ! -d "node_modules" ] || [ ! -d "client/node_modules" ]; then
    echo "📦 Installing dependencies (this may take a minute)..."
    npm install --silent > /dev/null 2>&1
    cd client && npm install --silent > /dev/null 2>&1 && cd ..
    echo "✅ Dependencies installed"
    echo ""
fi

# Check .env
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env created (you may want to edit it)"
    echo ""
fi

# Check MongoDB
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running!"
    echo "   Start it with: brew services start mongodb-community"
    echo "   Or use MongoDB Atlas and update MONGODB_URI in .env"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "════════════════════════════════════════════"
echo "🚀 Starting CommunityHub..."
echo "════════════════════════════════════════════"
echo ""
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "   Press Ctrl+C to stop"
echo ""
echo "════════════════════════════════════════════"
echo ""

# Start the application
npm run dev
