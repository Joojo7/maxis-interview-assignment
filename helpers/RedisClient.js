const { createClient } = require("redis");

const redisPort = 6379;
const redisHost = "localhost";
const redisDB = 0;

class RedisClient {
  constructor(redisPort, redisHost, redisDB) {
    this._client = createClient({
      socket: {
        port: redisPort,
        host: redisHost,
        reconnectStrategy: () => {
          // Fail silently and stop retrying
          return 0; // Return 0 to stop the client from retrying
        },
      },
      database: redisDB,
    });

    // Connect to Redis client
    this._client.connect();

    // Handle client error events but fail silently
    this._client.on("error", (err) => {
      // Optionally log an error message if needed
      // console.error("RedisClient Error:", err);
    });
  }

  // Get a value from Redis
  async get(key) {
    try {
      return await this._client.get(key);
    } catch (error) {
      // Fail silently without logging
    }
  }

  // Set a value in Redis
  async set(key, value, options = {}) {
    try {
      return await this._client.set(key, value, options);
    } catch (error) {
      // Fail silently without logging
    }
  }

  // Delete a key from Redis
  async del(key) {
    try {
      await this._client.del(key);
    } catch (error) {
      // Fail silently without logging
    }
  }
}

// Export an instance of the RedisClient class
module.exports = new RedisClient(redisPort, redisHost, redisDB);
