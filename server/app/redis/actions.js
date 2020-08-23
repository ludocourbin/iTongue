const redisClient = require("./client");

module.exports = {

  /**
   * Checks if request exists in cache by query name as value
   * @param {String} key - Redis key to find
   * @returns {Promise<Array>} Results from Redis
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
   * Store Postgres request results in Redis
   * @param {String} key - Redis key to write
   * @param {Array<Object>} results - Results from Postgres request to store
   * @param {Number} [expirationTime] - After this time expressed in seconds, entry will be destroyed
   * @returns {Promise<string>}
   */
  setInCache(key, results, expirationTime) {
    if (!expirationTime) {
      return new Promise((resolve, reject) => {
        redisClient.set(key, JSON.stringify(results), (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        });
      });
    }

    return new Promise((resolve, reject) => {
      redisClient.setex(key, expirationTime, JSON.stringify(results), (err, data) => {
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
   * @param {String} key - Redis key to write
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
  }
};
