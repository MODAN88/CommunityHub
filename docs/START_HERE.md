# 🚀 START HERE - CommunityHub

## ⚡ Super Quick Start (3 Steps)

### 1️⃣ Make scripts executable
```bash
chmod +x run.sh install-and-run.sh
```

### 2️⃣ Run everything automatically
```bash
./install-and-run.sh
```

### 3️⃣ Open your browser
```
http://localhost:3000
```

**That's it! The app is running! 🎉**

---

## 📱 What You Can Do Now

1. **Register** - Create your account at http://localhost:3000/register
2. **Login** - Sign in with your credentials
3. **Create Event** - Click "Create Event" in the navbar
4. **Browse Events** - See all community events
5. **Join Events** - Register for events you like

---

## ⚙️ Alternative: Manual Start

If the automated script doesn't work:

```bash
# Install everything
npm install && cd client && npm install && cd ..

# Start MongoDB (choose one):
brew services start mongodb-community    # macOS
sudo systemctl start mongod              # Linux

# Create .env file
cp .env.example .env

# Start the app
npm run dev
```

---

## 🛠️ Common Issues

**Port already in use?**
```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

**MongoDB not running?**
```bash
brew services start mongodb-community
```

**Dependencies issue?**
```bash
rm -rf node_modules client/node_modules
npm install && cd client && npm install
```

---

## 📚 More Information

- [Full README](./README.md) - Complete documentation
- [Installation Guide](./INSTALLATION.md) - Detailed setup
- [API Docs](./API_DOCUMENTATION.md) - API reference
- [Quick Start Guide](./QUICK_START.md) - More options

---

## 🆘 Need Help?

1. Make sure Node.js is installed: `node --version`
2. Make sure MongoDB is running: `brew services list`
3. Check the console for error messages
4. Read the [INSTALLATION.md](./INSTALLATION.md)

---

**Ready to build amazing community features? Let's go! 🎯**
