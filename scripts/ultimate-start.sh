#!/bin/bash

# CommunityHub - Final Setup & Run
# This is the ultimate one-script setup for everything

set -e

clear

cat << "EOF"
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║               🏘️  CommunityHub - Ultimate Setup                  ║
║                                                                  ║
║            Full-Stack Community Management Platform              ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝

EOF

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ ${NC}$1"
}

log_success() {
    echo -e "${GREEN}✓ ${NC}$1"
}

log_error() {
    echo -e "${RED}✗ ${NC}$1"
}

log_warn() {
    echo -e "${YELLOW}⚠ ${NC}$1"
}

# Check prerequisites
log_info "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed!"
    echo "Install from: https://nodejs.org/"
    exit 1
fi
log_success "Node.js $(node --version) found"

# Check npm
if ! command -v npm &> /dev/null; then
    log_error "npm is not installed!"
    exit 1
fi
log_success "npm $(npm --version) found"

echo ""
log_info "Checking MongoDB..."

if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null 2>&1; then
        log_success "MongoDB is running"
    else
        log_warn "MongoDB is installed but not running"
        if command -v brew &> /dev/null; then
            log_info "Starting MongoDB..."
            brew services start mongodb-community 2>/dev/null || true
            sleep 2
            if pgrep -x "mongod" > /dev/null 2>&1; then
                log_success "MongoDB started"
            else
                log_warn "Could not auto-start MongoDB"
                echo "   Please run manually: brew services start mongodb-community"
            fi
        else
            log_warn "Please start MongoDB manually"
        fi
    fi
else
    log_warn "MongoDB not found"
    echo "   Install with: brew install mongodb-community"
    echo "   Or use MongoDB Atlas (update MONGODB_URI in .env)"
fi

echo ""
log_info "Setting up environment..."

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    log_info "Creating .env file..."
    cp .env.example .env
    log_success ".env file created"
else
    log_success ".env file already exists"
fi

# Check if dependencies need installation
echo ""
log_info "Checking dependencies..."

BACKEND_INSTALLED=false
FRONTEND_INSTALLED=false

if [ -d "node_modules" ] && [ -f "node_modules/express/package.json" ]; then
    log_success "Backend dependencies already installed"
    BACKEND_INSTALLED=true
fi

if [ -d "client/node_modules" ] && [ -f "client/node_modules/react/package.json" ]; then
    log_success "Frontend dependencies already installed"
    FRONTEND_INSTALLED=true
fi

if [ "$BACKEND_INSTALLED" = false ] || [ "$FRONTEND_INSTALLED" = false ]; then
    echo ""
    log_info "Installing missing dependencies..."
    
    if [ "$BACKEND_INSTALLED" = false ]; then
        log_info "Installing backend dependencies (this may take a moment)..."
        npm install --silent
        log_success "Backend dependencies installed"
    fi
    
    if [ "$FRONTEND_INSTALLED" = false ]; then
        log_info "Installing frontend dependencies (this may take a moment)..."
        cd client
        npm install --silent
        cd ..
        log_success "Frontend dependencies installed"
    fi
fi

# Final summary
clear

cat << "EOF"
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║                  ✅ Setup Complete!                              ║
║                                                                  ║
║              🏘️  CommunityHub is ready to run                     ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝

EOF

echo ""
echo "🌐 Application URLs:"
echo "   Frontend:    http://localhost:3000"
echo "   Backend:     http://localhost:5000"
echo "   Health:      http://localhost:5000/api/health"
echo ""
echo "📚 Documentation:"
echo "   • HEBREW_README.md    - מדריך בעברית"
echo "   • START_HERE.md       - Quick start guide"
echo "   • README.md           - Full documentation"
echo "   • API_DOCUMENTATION  - API reference"
echo ""
echo "⌨️  Available commands:"
echo "   npm run dev           - Start both servers"
echo "   npm run server        - Start backend only"
echo "   npm run client        - Start frontend only"
echo "   make all              - Setup and run with Makefile"
echo ""

read -p "Ready to start? Press Enter to continue..." -t 5 || true

echo ""
echo "🚀 Starting CommunityHub..."
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  Starting development servers..."
echo "  Press Ctrl+C to stop"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Start the application
npm run dev
