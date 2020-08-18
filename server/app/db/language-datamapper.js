const client = require("./index");

/**
 * @property {Number} id - id of the language
 * @property {String} name - name of the language
 * @property {String} code - code of the language
 */

module.exports = {
  /**
   * Creates a new language
   * @property {String} name - name of the language
   * @property {String} code - code of the language
   * @returns {Boolean} - True if success
   */
  create: async (data) => {
    try {
      const query = {
        name: "create-language",
        text: `
          INSERT INTO "language"("name", "code")
               VALUES($1, $2)
            RETURNING *
          `,
        values: [data.name, data.code],
      };

      const result = await client.query(query);

      return result.rows;
      
    } catch (error) {
      console.log(error);
      if (error.code === "23505") {
        return { error: error.detail };
      }
    }
  },

  /**
   * This method returns all languages in database
   * @returns {Array.Object} - Set of objects representing available languages
   */
  findAll: async () => {
    try {
      const query = {
        name: "get-languages",
        text: 'SELECT * FROM "language"',
        values: [],
      };

      const result = await client.query(query);
      // console.log("result datamapper", result);

      if (!result.rows) {
        throw new Error("Unexpected issue: unable to get languages");
      }

      return result.rows;
    } catch (error) {
      console.log("Error", error);
    }
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
        values: [name],
      };
  
      const result = await client.query(query);
      console.log(result)
  
      if (!result.rows) {
        throw new Error(`Unexpected issue: unable to get language : ${name}`);
      }
      
      if (result.rows.length === 0) {
        return {};
      }

      return result.rows[0];

    } catch (error) {
      console.log(error)
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
        values: [code],
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
  },
};
