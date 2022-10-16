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
        reconnectStrategy: (retries) => {
          log.debug("RedisClient.retry_strategy", { retries });

          if (retries > this._maxRetries) {
            this._client.disconnect();
            throw Error("Retry attempts exhausted");
          }
          return retries;
        },
      },
      database: redisDB,
    });
    this._client.connect();

    this._client.on("error", (err) => {
      log.error({ err: err }, "ERR:REDIS:");
    });
  }

  async get(key) {
    try {
      return await this._client.get(key);
    } catch (error) {
      console.log("RedisClient.get:", error);
    }
  }

  async set(key, value, options) {
    try {
      return await this._client.set(key, value, {
        ...options,
      });
    } catch (error) {
      console.log("RedisClient.set:", error);
    }
  }

  async del(key) {
    try {
      await this._client.del(key);
      return;
    } catch (error) {
      console.log("RedisClient.del:", error);
    }
  }
}

module.exports = new RedisClient(redisPort, redisHost, redisDB);
