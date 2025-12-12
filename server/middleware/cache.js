const { getCached, setCached, deleteCached, clearCachePattern } = require('../config/redis');

// Middleware to cache GET requests
const cacheMiddleware = (prefix, ttl = 3600) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    try {
      const cacheKey = `${prefix}:${req.originalUrl}`;
      const cachedData = await getCached(cacheKey);

      if (cachedData) {
        return res.status(200).json({
          success: true,
          data: cachedData,
          fromCache: true
        });
      }

      // Store original json method
      const originalJson = res.json.bind(res);

      // Override json method to cache response
      res.json = function(data) {
        if (res.statusCode === 200 && data.success) {
          setCached(cacheKey, data.data, ttl);
        }
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

// Function to invalidate cache
const invalidateCache = async (pattern) => {
  try {
    await clearCachePattern(pattern);
  } catch (error) {
    console.error('Cache invalidation error:', error);
  }
};

module.exports = {
  cacheMiddleware,
  invalidateCache
};
