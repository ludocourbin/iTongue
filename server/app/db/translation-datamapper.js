const client = require("../redis/cache");

module.exports = {
  /**
   * Creates a new translation
   * @returns {Object} - Created translation
   */
  create: async translation => {
    const query = {
      name: "insert-translation",
      text: 'SELECT "insert_translation"($1) AS "id"',
      values: [translation]
    };
    return await client.query(query);
  },

  /**
   * Updates an existing translation
   * @param {Number} translation_id - ID of the translation to update
   * @param {String} text - New text of the translation
   * @param {Number} expression_id - ID of the expression related to the translation
   * @param {Number} language_id - ID of the language related to the translation
   * @returns {Boolean} - True if success
   */
  updateOne: async (translation_id, { text, expression_id, language_id }) => {
    const query = {
      name: "update-translation-by-id",
      text: 'SELECT update_translation($1, $2, $3, $4) AS "updated"',
      values: [translation_id, text, expression_id, language_id]
    };
    const results = await client.query(query);
    return results[0];
  },

  /**
   * Find all translations
   * @returns {Array} - Set of objects representing available translations
   */
  findAll: async () => {
    const query = {
      name: "select-all-translations",
      text: 'SELECT * FROM "translation"'
    };
    return await client.query(query);
  },

  /**
   * Find translation by ID
   * @param {String} id - ID of the translation to find
   * @returns {Object} - Fetched translation
   */
  findOneById: async id => {
    const query = {
      name: "select-translation-by-id",
      text: 'SELECT * FROM "translation" WHERE "id" = $1',
      values: [id]
    };
    const results = await client.query(query);
    return results[0];
  },

  /**
   * Deletes one translation by ID
   * @param {Number} id - ID of the translation to delete
   * @returns {Boolean} - True if success
   */
  deleteOne: async id => {
    const query = {
      name: "delete-translation-by-id",
      text: 'DELETE FROM "translation" WHERE "id" = $1 RETURNING TRUE AS "deleted"',
      values: [id]
    };
    const results = await client.query(query);
    return results[0];
  }
};
