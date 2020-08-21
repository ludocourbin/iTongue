const client = require("./index");

module.exports = {
  /**
   * Creates a new expression
   * @param {String} label - Label of the expression
   * @returns {Number} - ID the new expression
   */
  create: async label => {
    const query = 'INSERT INTO "expression"("label") VALUES($1) RETURNING "id"';
    const result = await client.query(query, [label]);
    return result.rows[0];
  },

  /**
   * Updates an expression
   * @param {Number} id - Label of the expression
   * @param {String} label - Label of the expression
   * @returns {Boolean} - True if updates successfully
   */
  updateOne: async ({ id, label }) => {
		const query = 'UPDATE "expression" SET "label" = $1 WHERE "id" = $2 RETURNING TRUE AS "updated"';
    const result = await client.query(query, [label, id]);
    return result.rows[0];
  },

  /**
   * Find all expressions
   * @returns {Array} - Set of objects representing available expressions
   */
  findAll: async () => {
    try {
      const result = await client.query('SELECT * FROM "expression_with_relations"');
      return result.rows;
    } catch (err) {
      // next(err);
    }
  },

  /**
   * Finds one expression by ID
   * @param {Number} id - ID of the expression
   * @returns {Object} - Object representing the expression
   */
  findOneById: async id => {
		const query = 'SELECT * FROM "expression" WHERE "id" = $1';
    const result = await client.query(query, [id]);
    return result.rows[0];
  },

  /**
   * Deletes one expression
   * @param {Number} id - id of the expression
   * @returns {Boolean} - True if success
   */
  deleteOne: async id => {
		const query = 'DELETE FROM "expression" WHERE "id" = $1';
		await client.query(query, [id]);
		return true;
  }
};
