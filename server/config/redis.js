const redis = require('redis');

let redisClient;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      db: process.env.REDIS_DB || 0,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            console.error('Max Redis retries reached, giving up');
            return new Error('Max retries reached');
          }
          return retries * 100;
        }
      }
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    redisClient.on('connect', () => {
      console.log('✓ Redis Connected');
    });

    redisClient.on('ready', () => {
      console.log('✓ Redis Ready');
    });

    await redisClient.connect();
    
    return redisClient;
  } catch (error) {
    console.error('Redis connection failed:', error.message);
    console.warn('⚠️  Running without Redis caching');
    return null;
  }
};

const getRedisClient = () => {
  return redisClient;
};

const cacheKey = (prefix, id) => {
  return `${prefix}:${id}`;
};

const getCached = async (key) => {
  try {
    if (!redisClient) return null;
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Cache get error:', error.message);
    return null;
  }
};

const setCached = async (key, value, ttl = 3600) => {
  try {
    if (!redisClient) return false;
    await redisClient.setEx(key, ttl, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Cache set error:', error.message);
    return false;
  }
};

const deleteCached = async (key) => {
  try {
    if (!redisClient) return false;
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error('Cache delete error:', error.message);
    return false;
  }
};

const clearCachePattern = async (pattern) => {
  try {
    if (!redisClient) return false;
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
    return true;
  } catch (error) {
    console.error('Cache clear error:', error.message);
    return false;
  }
};

module.exports = {
  connectRedis,
  getRedisClient,
  cacheKey,
  getCached,
  setCached,
  deleteCached,
  clearCachePattern
};
