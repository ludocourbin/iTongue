const client = require("./index");

module.exports = {
  /**
   * Creates a new language
   * @param {String} name - name of the language
   * @param {String} code - code of the language
   * @returns {Number} - Id of the language
   */
  create: async ({ name, code }) => {
    const query = 'INSERT INTO "language"("name", "code") VALUES($1, $2) RETURNING "id"';
    const result = await client.query(query, [name, code]);
    return result.rows;
  },

  /**
   *Find all languges
   * @returns {Array} - Set of objects representing available languages
   */
  findAll: async () => {
    const query = 'SELECT * FROM "language"';
    const result = await client.query(query);
    return result.rows;
  },

  /**
   * This method returns asked language
   * @property {String} name - Name of the language
   * @returns {Object} - Object representing the language
   */
  findOneByName: async name => {
    try {
      const query = {
        name: "get-language-by-name",
        text: `
          SELECT * 
            FROM "language" 
           WHERE name = $1
          `,
        values: [name]
      };

      const result = await client.query(query);
      console.log(result);

      if (!result.rows) {
        throw new Error(`Unexpected issue: unable to get language : ${name}`);
      }

      if (result.rows.length === 0) {
        return {};
      }

      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * This method returns asked language
   * @property {String} code - Code of the language
   * @returns {Object} - Object representing the language
   */
  findOneByCode: async code => {
    try {
      const query = {
        name: "get-language-by-code",
        text: `
          SELECT * 
            FROM "language" 
           WHERE "code" = $1
          `,
        values: [code]
      };

      const result = await client.query(query);

      if (!result.rows) {
        throw new Error(`Unexpected issue: unable to get language : ${code}`);
      }

      if (result.rows.length === 0) {
        return {};
      }

      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
  },

  // Error handling with details
  LanguageAlreadyExistsException: function (detail) {
    this.message = detail;
    this.toString = () => this.message;
  }
};
