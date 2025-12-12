const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Modern Mongoose no longer needs useNewUrlParser/useUnifiedTopology
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️  MongoDB Error: ${error.message}`);
    // Don't exit - allow server to run without database
    return null;
  }
};

module.exports = connectDB;
