#!/bin/bash

# CommunityHub - Development Server Launcher
# Starts both backend and frontend in development mode

echo "🚀 Starting CommunityHub Development Servers..."
echo ""

# Check if MongoDB is running
echo "Checking MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB not running. Starting MongoDB..."
    brew services start mongodb-community@7.0 2>/dev/null || echo "⚠️  Could not start MongoDB. Please start manually."
fi

# Check if Redis is running
echo "Checking Redis..."
if ! pgrep -x "redis-server" > /dev/null; then
    echo "⚠️  Redis not running. Starting Redis..."
    brew services start redis 2>/dev/null || echo "⚠️  Could not start Redis. Please start manually."
fi

echo ""
echo "Starting development servers..."
echo "Backend: http://localhost:5001"
echo "Frontend: http://localhost:3000"
echo ""

npm run dev
