const client = require("../redis/cache");

module.exports = {
  /**
   * Creates a new language
   * @param {String} name - name of the language
   * @param {String} code - code of the language
   * @returns {Number} - Id of the language
   */
  create: async ({ name, code }) => {
    const query = {
      name: "admin-insert-language",
      text: 'INSERT INTO "language"("name", "code") VALUES($1, $2) RETURNING "id"',
      values: [name, code]
    };
    const result = await client.query(query);
    return result[0];
  },

  /**
   * Find all languges
   * @returns {Array} - Set of objects representing available languages
   */
  findAll: async () => {
    const query = {
      name: "select-all-languages",
      text: 'SELECT * FROM "language"'
    };
    return await client.query(query);
  },

  /**
   * Find languge by ID
   * @property {String} id - ID of the language
   * @returns {Object} - Object representing the language
   */
  findOneById: async id => {
    const query = {
      name: "select-language-by-id",
      text: 'SELECT * FROM "language" WHERE "id" = $1',
      values: [id]
    };
    const results = await client.query(query);
    return results[0];
  },

  /**
   * Find languge by name
   * @property {String} name - Name of the language
   * @returns {Object} - Object representing the language
   */
  findOneByName: async name => {
    const query = {
      name: "select-language-by-name",
      text: 'SELECT * FROM "language" WHERE "name" = $1',
      values: [name]
    };
    const results = await client.query(query);
    return results[0];
  },

  /**
   * Find languges by code
   * @property {String} code - Code of the language
   * @returns {Object} - Object representing the language
   */
  findOneByCode: async code => {
    const query = {
      name: "select-language-by-code",
      text: 'SELECT * FROM "language" WHERE "code" = $1',
      values: [code]
    };
    const result = await client.query(query);
    return result.rows[0];
  }
};
