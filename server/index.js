const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const errorHandler = require('./middleware/error');
const fs = require('fs');
const path = require('path');

// Simple crash logger to capture startup issues
const logFile = path.join(__dirname, 'server.log');
const logLine = (message) => {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  try {
    fs.appendFileSync(logFile, line, 'utf8');
  } catch (_) {
    // ignore logging errors
  }
};

process.on('uncaughtException', (err) => {
  logLine(`UncaughtException: ${err.stack || err.message}`);
  console.error('UncaughtException:', err);
});

process.on('unhandledRejection', (reason) => {
  logLine(`UnhandledRejection: ${reason && reason.stack ? reason.stack : reason}`);
  console.error('UnhandledRejection:', reason);
});

// Load env vars
dotenv.config();

console.log('\n🚀 CommunityHub Server Starting...\n');

// Create Express app FIRST
const app = express();

// CORS - Allow all origins in development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/events', require('./routes/events'));
app.use('/api/announcements', require('./routes/announcements'));

// API root info
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CommunityHub API',
    endpoints: {
      health: '/api/health',
      auth: ['/api/auth/register', '/api/auth/login', '/api/auth/me'],
      users: '/api/users',
      events: '/api/events',
      announcements: '/api/announcements'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// Error handler
app.use(errorHandler);

// Serve built client (if present). This makes it possible to run only the server
// in production or after running `cd client && npm run build` during local testing
// to avoid development proxy/network issues.
try {
  const clientBuild = path.join(__dirname, '..', 'client', 'build');
  if (fs.existsSync(clientBuild)) {
    app.use(express.static(clientBuild));
    app.get('*', (req, res) => {
      res.sendFile(path.join(clientBuild, 'index.html'));
    });
    console.log('📦 Serving static client from', clientBuild);
  }
} catch (err) {
  // ignore if check fails
}

const PORT = process.env.PORT || 5001;

// Start server IMMEDIATELY - don't wait for database/redis
const server = app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
  console.log(`   Frontend: http://localhost:3000`);
  console.log(`   API: http://localhost:${PORT}/api`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});

// Connect to databases in background (non-blocking)
(async () => {
  console.log('📦 Connecting to external services...\n');

  // Try to connect to MongoDB
  try {
    await connectDB();
    console.log('   ✅ Database ready');
  } catch (err) {
    console.log('   ⚠️  No database (registration/login will fail)');
  }

  // Try to connect to Redis
  try {
    await connectRedis();
    console.log('   ✅ Cache ready\n');
  } catch (err) {
    console.log('   ⚠️  No Redis (caching disabled)\n');
  }
})();

module.exports = app;
