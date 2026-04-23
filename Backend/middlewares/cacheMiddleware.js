const { redisClient } = require("./../config/redisClient");

const cache = (keyPrefix, ttl = 60) => {
  return async (req, res, next) => {
    try {
      const key = `${keyPrefix}:${req.originalUrl}`;

      const cachedData = await redisClient.get(key);

      if (cachedData) {
        console.log(`Cache HIT ✅ ${keyPrefix}`);
        return res.json(JSON.parse(cachedData));
      }

      console.log(`Cache MISS ❌ ${keyPrefix} `);

      const originalJson = res.json.bind(res);

      res.json = async (data) => {
        await redisClient.setEx(key, ttl, JSON.stringify(data));
        return originalJson(data);
      };

      next();
    } catch (err) {
      console.error("Cache Error:", err);
      next();
    }
  };
};

module.exports = cache;