const mongoose = require('mongoose');
// Use an in-memory MongoDB for development when no MONGODB_URI is provided
let mongodbMemoryServer;
try {
  // require lazily to avoid adding overhead in production
  const { MongoMemoryServer } = require('mongodb-memory-server');
  mongodbMemoryServer = MongoMemoryServer;
} catch (err) {
  // mongodb-memory-server may not be installed in production; that's fine
  mongodbMemoryServer = null;
}

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;

    // If no URI provided, try an in-memory server (useful for local dev/tests)
    if (!mongoUri && mongodbMemoryServer) {
      const mem = await mongodbMemoryServer.create();
      mongoUri = mem.getUri();
      console.log('ℹ️  No MONGODB_URI found — using in-memory MongoDB for development');
      // keep a reference so it isn't GC'd (useful for shutdown later)
      connectDB._memoryServer = mem;
    }

    if (!mongoUri) {
      throw new Error('MONGODB_URI not provided');
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️  MongoDB Error: ${error.message}`);
    // Don't exit - allow server to run without database
    return null;
  }
};

module.exports = connectDB;
