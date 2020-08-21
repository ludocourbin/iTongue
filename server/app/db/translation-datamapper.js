const client = require("./index");

module.exports = {
  /**
   * Creates a new translation
   * @returns {Object} - Created translation
   */
  create: async translation => {
    const query = 'SELECT "insert_translation"($1) AS "id"';
    const results = await client.query(query, [translation]);
    return results.rows[0];
  },
  
  /**
   * Updates an existing translation
   * @param {Number} translation_id - ID of the translation to update
   * @param {String} text - New text of the translation
   * @param {Number} expression_id - ID of the expression related to the translation
   * @param {Number} language_id - ID of the language related to the translation
   * @returns {Boolean} - True if success
   */
  updateOne: async (translation_id, {text, expression_id, language_id}) => {
    const query = 'SELECT update_translation($1, $2, $3, $4) AS "updated"';
    const results = await client.query(query, [translation_id, text, expression_id, language_id]);
    return results.rows[0];
  },

  /**
   * Find all translations
   * @returns {Array} - Set of objects representing available translations
   */
  findAll: async () => {
    const query = 'SELECT * FROM "translation"';
    const results = await client.query(query);
    return results.rows;
  },

  /**
   * Find translation by ID
   * @param {String} id - ID of the translation to find
   * @returns {Object} - Fetched translation
   */
  findOneById: async id => {
    const query = 'SELECT * FROM "translation" WHERE "id" = $1';
    const results = await client.query(query, [id]);
    return results.rows[0];
  },
  
  /**
  * Deletes one translation by ID
  * @param {Number} id - ID of the translation to delete
  * @returns {Boolean} - True if success
  */
 deleteOne: async id => {
    const query = 'DELETE FROM "translation" WHERE "id" = $1';
    await client.query(query, [id]);
    return true;
 },
};
