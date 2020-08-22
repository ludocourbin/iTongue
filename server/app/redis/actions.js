const redisClient = require("./client");

module.exports = {
  /**
   * Checks if request exists in cache by name
   * @param {string} key - Redis key to find
   * @returns {Promise<Array>} Results from Redis or Postgres
   */
  getFromCache(key) {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  },

  /**
   * Store requests results in Redis
   * @param {string} key - Redis key to write
   * @param {Array<Object>} result - Results from Postgres request
   * @returns {Promise<string>}
   */
  setInCache(key, result) {
    const expirationTime = 60 * 60;
    return new Promise((resolve, reject) => {
      redisClient.setex(key, expirationTime, JSON.stringify(result), (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  },

  /**
   * Clear Redis entry by KEY
   * @param {string} key - Redis key to write
   * @returns {Promise<string>}
   */
  clearFromCache(key) {
    return new Promise((resolve, reject) => {
      redisClient.del(key, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  },
}