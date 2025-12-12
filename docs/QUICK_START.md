# Quick Start Guide

## 🚀 Fastest Way to Start

### Option 1: Using the Setup Script (Recommended)

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
```bash
setup.bat
```

This will:
- ✅ Check Node.js installation
- ✅ Install all dependencies (backend + frontend)
- ✅ Create .env file
- ✅ Start MongoDB (if installed)
- ✅ Ask if you want to start the app

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install
cd client && npm install && cd ..

# 2. Create environment file
cp .env.example .env

# 3. Start MongoDB
brew services start mongodb-community  # macOS
# or
sudo systemctl start mongod            # Linux
# or use MongoDB Atlas

# 4. Start the application
npm run dev
```

## 📱 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health:** http://localhost:5000/api/health

## 🎯 First Steps After Starting

1. **Register an Account:**
   - Go to http://localhost:3000/register
   - Create your first user

2. **Create an Event:**
   - Login and click "Create Event"
   - Fill in the event details

3. **Browse Events:**
   - Visit the Events page
   - Register for events

## ⚡ Available Commands

```bash
npm run dev        # Start both frontend & backend
npm run server     # Start backend only
npm run client     # Start frontend only
npm run build      # Build for production
npm test           # Run tests
```

## 🔧 VS Code Tasks

Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux), then:
- Type "Tasks: Run Task"
- Select from:
  - Install All Dependencies
  - Start Development Servers
  - Start Backend Only
  - Start Frontend Only

## 📝 Default Test Credentials

You can create these users for testing:

**Admin:**
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "admin123",
  "role": "admin"
}
```

**Member:**
```json
{
  "name": "Test User",
  "email": "user@test.com",
  "password": "user123"
}
```

## ❓ Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb-community
```

### Port Already in Use
```bash
# Kill process on port 5000 (Backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9
```

### Clear npm cache
```bash
npm cache clean --force
rm -rf node_modules client/node_modules
npm install
cd client && npm install
```

## 📚 Documentation

- [Full README](./README.md)
- [Installation Guide](./INSTALLATION.md)
- [API Documentation](./API_DOCUMENTATION.md)

---

**Ready? Run `npm run dev` and start building! 🎉**
