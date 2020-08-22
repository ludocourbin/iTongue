const client = require("../db/index");
const { getFromCache, setInCache } = require("./");

module.exports = {
  prefix: "itongue_",

  /**
   * Intercepts requests to cache results in Redis
   * 
   * @param {Object} params Request
   * Name of the query must follow this pattern:
   * 
   * \<SQL_VERB>-\<SQL_RELATION>-[\<QUERY_MODE>]
   * 
   * Example: update-expression-byId
   * @property {String} name : Name of the request used for genreate Redis key
   * @property {String} text : SQL query to be passed to PG client
   * @returns {Promise<Array>} Results from Redis or Postgres
   */
  async query(...params) {
    // console.log("SQL query", params)
    console.log("******************************");

    const { name, values } = params[0];
    const key = this.generateKey(name, values);
    console.log("KEY:", key);
    
    const selectRegex = /^select.*$/m;
    if (selectRegex.test(name)) {
      const chachedResults = await getFromCache(key);
      if (chachedResults) {
        chachedResults ? console.log("FROM REDIS:", true) : console.log("FROM REDIS:", true);
        return chachedResults;
      }
      
      const freshResults = await client.query(params[0]);
      freshResults ? console.log("FROM POSTGRES:", true) : console.log("FROM POSTGRES:", true);
      if (freshResults.rows.length === 0) return [];
      
      const stored = await setInCache(key, freshResults.rows);
      stored === "OK" ? console.log("STORED:", true) : console.log("STORED:", false); 
      return freshResults.rows;
    }
    
    const updateMutation = /^update.*$/m;
    if (updateMutation.test(name)) {
      console.log("UPDATE KEY", key)
      // const isExist = await getFromCache(key);
      // if (!isExist) return;
      // clearFromCache(key);
      return;
    }
    
    const deleteMutation = /^delete.*$/m;
    if (deleteMutation.test(name)) {
      console.log("DELETE KEY", key)
      const newKey = key.replace(/^delete/, "select");
      console.log("NEW KEY", newKey)
      // const isExist = await getFromCache(key);
      // if (!isExist) return;
      // clearFromCache(key);
      return;
    }
  },

  /**
   * Generates the KEY for redis
   * @param {string} name - Name of the request
   * @param {Array} values - Values of the request
   * @returns {string} Generated Key with PREFIX
   */
  generateKey(name, values) {
    if (values) {
      return this.prefix + name + "-" + values.join("-");
    }
    return this.prefix + name;
  }
};
