#!/bin/bash

echo "🎯 CommunityHub - Complete Setup Script"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node --version)${NC}"
echo -e "${GREEN}✅ npm version: $(npm --version)${NC}"
echo ""

# Check if MongoDB is running
if command -v mongod &> /dev/null
then
    echo -e "${BLUE}📊 Checking MongoDB...${NC}"
    if pgrep -x "mongod" > /dev/null
    then
        echo -e "${GREEN}✅ MongoDB is running${NC}"
    else
        echo -e "${BLUE}🔄 Starting MongoDB...${NC}"
        if command -v brew &> /dev/null
        then
            brew services start mongodb-community 2>/dev/null || mongod --fork --logpath /tmp/mongodb.log
        else
            mongod --fork --logpath /tmp/mongodb.log 2>/dev/null || echo -e "${RED}⚠️  Please start MongoDB manually${NC}"
        fi
    fi
else
    echo -e "${RED}⚠️  MongoDB not found. Make sure MongoDB is installed and running.${NC}"
    echo -e "${BLUE}   You can install it with: brew install mongodb-community${NC}"
fi

echo ""
echo -e "${BLUE}📦 Installing Backend Dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📦 Installing Frontend Dependencies...${NC}"
cd client
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

cd ..

echo ""
echo -e "${GREEN}✅ All dependencies installed successfully!${NC}"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${BLUE}🔧 Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

echo ""
echo "========================================"
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "========================================"
echo ""
echo -e "${BLUE}To start the application:${NC}"
echo ""
echo "  ${GREEN}npm run dev${NC}         - Start both frontend and backend"
echo "  ${GREEN}npm run server${NC}      - Start backend only"
echo "  ${GREEN}npm run client${NC}      - Start frontend only"
echo ""
echo -e "${BLUE}The application will be available at:${NC}"
echo "  Frontend: ${GREEN}http://localhost:3000${NC}"
echo "  Backend:  ${GREEN}http://localhost:5000${NC}"
echo ""
echo "========================================"
echo ""

read -p "Would you like to start the application now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    echo -e "${BLUE}🚀 Starting CommunityHub...${NC}"
    echo ""
    npm run dev
fi
