# 🏘️ CommunityHub

A modern full-stack web application for managing community events, members, and activities with real-time updates, user authentication, and event management capabilities.

---

## 📖 Documentation & Quick Links

| Icon | Link | Description |
|------|------|-------------|
| 🚀 | **[Quick Start](#-quick-start)** | Get up and running in 5 minutes |
| 📋 | **[Installation](#installation)** | Detailed setup instructions |
| 🔌 | **[API Reference](#-api-endpoints)** | Complete API documentation |
| 🎯 | **[User Flows](#-user-flows)** | How to use the application |
| 📊 | **[Architecture](#-project-structure)** | Code organization & structure |
| 🔧 | **[Environment Variables](#-environment-configuration)** | Configuration reference |
| 📈 | **[Status Report](./PROJECT_STATUS.md)** | Full project status & checklist |
| 📝 | **[Changelog](./CHANGELOG.md)** | Version history & bug fixes |

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration with email and password
- Secure login with JWT tokens (7-day expiry)
- Password hashing with bcryptjs
- Protected routes and API endpoints
- Role-based access control (Member, Admin)

### 📅 Event Management
- **Create Events** - Organize community activities
- **Browse Events** - Discover and explore upcoming events
- **Register/Unregister** - Join events with one click
- **Event Categories** - 7 categories (workshop, seminar, social, sports, culture, volunteer, other)
- **Capacity Management** - Set max participants and track availability
- **Organizer Dashboard** - Manage your created events

### 📊 User Dashboard
- **Statistics** - View events created and registered
- **My Events** - Events you organized
- **Registered Events** - Events you joined
- **Quick Actions** - Navigate to manage events

### ⚡ Performance Features
- **Redis Caching** - 1-hour TTL for fast event retrieval
- **Smart Invalidation** - Cache updates on event changes
- **Optimized Queries** - Mongoose populate() for efficiency
- **Responsive Design** - Works on all devices

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - Web server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Redis** - In-memory caching layer
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing and security

### Frontend
- **React 18** - Modern UI framework
- **React Router v6** - Client-side navigation
- **Axios** - HTTP client with interceptors
- **Context API** - Global state management
- **CSS3** - Responsive styling

---

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ **Node.js** v14+ ([Download](https://nodejs.org/))
- ✅ **npm** v6+ (comes with Node.js)
- ✅ **MongoDB Community** v4.4+ ([Install](https://www.mongodb.com/try/download/community))
- ✅ **Redis** v6.0+ ([Install](https://redis.io/download))

### System Requirements
- **macOS/Linux** or **Windows** with WSL2
- **2GB RAM** minimum
- **500MB** free disk space

### Installation Guides

<details>
<summary><strong>📱 macOS (Homebrew)</strong></summary>

```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0

# Install Redis
brew install redis

# Start services
brew services start mongodb-community@7.0
brew services start redis
```

</details>

<details>
<summary><strong>🐧 Linux (Ubuntu/Debian)</strong></summary>

```bash
# Install MongoDB
sudo apt-get install -y mongodb

# Install Redis
sudo apt-get install -y redis-server

# Start services
sudo systemctl start mongodb
sudo systemctl start redis-server
```

</details>

<details>
<summary><strong>🪟 Windows</strong></summary>

- Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
- Download Redis for Windows from [microsoftarchive](https://github.com/microsoftarchive/redis/releases)
- Run installers and follow instructions
- Services should auto-start on reboot

</details>

---

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Clone repository
git clone https://github.com/MODAN88/CommunityHub.git
cd CommunityHub

# Run installer (macOS/Linux)
chmod +x scripts/install-and-run.sh
./scripts/install-and-run.sh

# Or Windows
scripts\setup.bat
```

### Option 2: Manual Setup

```bash
# 1. Clone repository
git clone https://github.com/MODAN88/CommunityHub.git
cd CommunityHub

# 2. Install all dependencies
npm install

# 3. Create environment configuration
cp .env.example .env

# 4. Start servers
npm run dev
```

### Option 3: Separate Terminals

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

---

## 🌐 Access Application

After starting servers, open your browser:

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3000 | Web application |
| **Backend API** | http://localhost:5001/api | REST API |
| **Health Check** | http://localhost:5001/api/health | Server status |

---

## Installation

### Detailed Step-by-Step

#### Step 1: Clone Repository

```bash
git clone https://github.com/MODAN88/CommunityHub.git
cd CommunityHub
```

#### Step 2: Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

#### Step 3: Configure Environment

```bash
# Copy example configuration
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your favorite editor
```

#### Step 4: Start Services

Ensure MongoDB and Redis are running, then:

```bash
npm run dev
```

This starts:
- **Backend** on http://localhost:5001
- **Frontend** on http://localhost:3000

---

## 🔧 Environment Configuration

### Required Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/communityhub

# Authentication
JWT_SECRET=your_very_secret_key_change_in_production
JWT_EXPIRE=7d

# Redis Cache
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# CORS
CORS_ORIGIN=http://localhost:3000

# Optional: Email (not required for development)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

See `.env.example` for all available options.

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Events
- `GET /api/events` - List all events (cached)
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create new event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)
- `POST /api/events/:id/register` - Register for event (protected)
- `POST /api/events/:id/unregister` - Unregister from event (protected)

### Users
- `GET /api/users` - List all users (admin only)
- `GET /api/users/:id` - Get user profile (protected)
- `PUT /api/users/:id` - Update profile (protected)
- `DELETE /api/users/:id` - Delete account (protected)

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement (admin)
- `PUT /api/announcements/:id` - Update announcement (admin)
- `DELETE /api/announcements/:id` - Delete announcement (admin)

---

## 🎯 User Flows

### 1️⃣ Registration & Login
1. Visit http://localhost:3000
2. Click "Register"
3. Enter name, email, password
4. Account created, redirected to login
5. Login with credentials
6. JWT token issued and stored

### 2️⃣ Creating an Event
1. Navigate to "Create Event"
2. Fill form: title, description, category, date, time, location, max participants
3. Submit form
4. Event appears in list immediately
5. You become the organizer

### 3️⃣ Registering for Events
1. Browse "Events" page
2. Click "Register" on any event card
3. Event added to your "Registered Events"
4. Participant count increments
5. Organizer sees you in participant list

### 4️⃣ Managing Dashboard
1. Go to "Dashboard"
2. View statistics
3. See your created events
4. See your registered events
5. Click event to view details or manage

---

## 📊 Project Structure

```
CommunityHub/
├── server/                          # Backend (Node.js + Express)
│   ├── config/
│   │   ├── db.js                   # MongoDB connection
│   │   └── redis.js                # Redis cache setup
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   ├── Event.js                # Event schema
│   │   └── Announcement.js         # Announcement schema
│   ├── controllers/
│   │   ├── authController.js       # Auth logic
│   │   ├── eventController.js      # Event operations
│   │   ├── userController.js       # User operations
│   │   └── announcementController.js
│   ├── routes/
│   │   ├── auth.js                 # Auth routes
│   │   ├── events.js               # Event routes
│   │   ├── users.js                # User routes
│   │   └── announcements.js        # Announcement routes
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification
│   │   ├── cache.js                # Cache middleware
│   │   └── error.js                # Error handling
│   └── index.js                    # Server entry point
│
├── client/                          # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   └── events/             # Event components
│   │   ├── context/
│   │   │   ├── EventContext.js     # Event state
│   │   │   ├── AuthContext.js      # Auth state
│   │   │   └── UserContext.js      # User state
│   │   ├── pages/
│   │   │   ├── Home.js             # Home page
│   │   │   ├── Login.js            # Login page
│   │   │   ├── Register.js         # Registration page
│   │   │   ├── Dashboard.js        # User dashboard
│   │   │   ├── Events.js           # Events list
│   │   │   ├── EventDetail.js      # Event details
│   │   │   └── CreateEvent.js      # Create event form
│   │   ├── utils/
│   │   │   └── api.js              # Axios instance
│   │   ├── App.js                  # Main app component
│   │   └── index.js                # React entry
│   └── public/                     # Static files
│
├── scripts/                         # Helper scripts
│   ├── dev.sh                      # Dev launcher
│   ├── reset.sh                    # Database reset
│   └── install-and-run.sh          # Auto setup
│
├── docs/                           # Documentation
│   ├── CHANGELOG.md                # Version history
│   ├── PROJECT_STATUS.md           # Status report
│   └── API_DOCUMENTATION.md        # API reference
│
├── .env.example                    # Config template
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies
└── README.md                       # This file
```

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- auth.test.js

# Run with coverage
npm test -- --coverage
```

---

## 🔄 Reset Database

To start fresh with clean data:

```bash
# Run reset script (macOS/Linux)
./scripts/reset.sh

# Or manually:
mongosh communityhub --eval "db.dropDatabase()"
redis-cli FLUSHDB
```

---

## 🚀 Production Deployment

### Environment Variables
Update `.env` for production:

```env
NODE_ENV=production
JWT_SECRET=generate_a_strong_random_key_here
MONGODB_URI=your_production_mongodb_url
CORS_ORIGIN=your_production_domain.com
```

### Build Frontend
```bash
cd client
npm run build
cd ..
```

### Deploy
Options:
- **Heroku** - `git push heroku main`
- **Vercel** - Connect GitHub repo
- **AWS** - EC2 + RDS + ElastiCache
- **Digital Ocean** - Droplet + managed DB
- **Railway** - Simple git push deployment

---

## 🔒 Security

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens with expiration
- ✅ CORS protection configured
- ✅ Input validation on all endpoints
- ✅ Protected API routes
- ✅ No sensitive data in responses
- ✅ Environment variables for secrets

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 5001
lsof -i :5001

# Kill it
kill -9 <PID>
```

### MongoDB Not Running
```bash
# macOS
brew services start mongodb-community@7.0

# Linux
sudo systemctl start mongodb

# Check status
mongo --version
```

### Redis Not Running
```bash
# macOS
brew services start redis

# Linux
sudo systemctl start redis-server

# Check status
redis-cli ping  # Should return PONG
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Support

- 📖 Read [PROJECT_STATUS.md](./PROJECT_STATUS.md) for detailed status
- 📝 Check [CHANGELOG.md](./CHANGELOG.md) for version history
- 🐛 Create an [Issue on GitHub](https://github.com/MODAN88/CommunityHub/issues)
- 💬 Check existing documentation in `/docs`

---

## 📜 License

This project is open source under the ISC License.

---

## 🎉 Success Checklist

After setup, verify everything works:

- [ ] Frontend loads on http://localhost:3000
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Can create an event
- [ ] Can see event in list
- [ ] Can register for an event
- [ ] Dashboard shows statistics
- [ ] Can unregister from event
- [ ] No console errors
- [ ] API health check responds

**All working? Awesome! 🚀 You're ready to use CommunityHub!**

---

**Made with ❤️ for the community**

Last Updated: December 12, 2025  
Version: 1.0.0
