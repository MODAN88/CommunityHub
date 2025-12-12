#!/bin/bash

# CommunityHub - Complete Installation & Run Script
# This script will install everything and start the application

set -e  # Exit on error

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║     CommunityHub - Auto Install & Run      ║"
echo "╔════════════════════════════════════════════╗"
echo ""

# Function to print colored output
print_success() {
    echo -e "\033[0;32m✓ $1\033[0m"
}

print_info() {
    echo -e "\033[0;34m→ $1\033[0m"
}

print_error() {
    echo -e "\033[0;31m✗ $1\033[0m"
}

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed!"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

print_success "Node.js $(node --version) detected"
print_success "npm $(npm --version) detected"
echo ""

# Check/Start MongoDB
print_info "Checking MongoDB..."
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        print_success "MongoDB is already running"
    else
        print_info "Starting MongoDB..."
        if command -v brew &> /dev/null; then
            brew services start mongodb-community 2>/dev/null && print_success "MongoDB started" || print_error "Please start MongoDB manually"
        else
            print_error "Please start MongoDB manually: mongod"
        fi
    fi
else
    print_error "MongoDB not found - you may need to install it"
    echo "Install with: brew install mongodb-community"
fi
echo ""

# Install backend dependencies
print_info "Installing backend dependencies..."
npm install --silent
print_success "Backend dependencies installed"
echo ""

# Install frontend dependencies
print_info "Installing frontend dependencies..."
cd client
npm install --silent
cd ..
print_success "Frontend dependencies installed"
echo ""

# Setup .env
if [ ! -f .env ]; then
    print_info "Creating .env file..."
    cp .env.example .env
    print_success ".env file created"
else
    print_success ".env file exists"
fi
echo ""

echo "╔════════════════════════════════════════════╗"
echo "║          Installation Complete! 🎉         ║"
echo "╔════════════════════════════════════════════╗"
echo ""
echo "Starting the application..."
echo ""
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the servers"
echo ""
echo "════════════════════════════════════════════"
echo ""

# Start the application
npm run dev
