const client = require("../redis/cache");

module.exports = {
  /**
   * Creates a new expression
   * @param {String} label - Label of the expression
   * @returns {Number} - ID the new expression
   */
  create: async label => {
    const query = {
      name: "insert-expression",
      text: 'INSERT INTO "expression"("label") VALUES($1) RETURNING "id"',
      values: [label]
    }
    const result = await client.query(query);
    return result.rows[0];
  },

  /**
   * Updates an expression
   * @param {Number} id - Label of the expression
   * @param {String} label - Label of the expression
   * @returns {Boolean} - True if updates successfully
   */
  updateOne: async ({ id, label }) => {
    const query = {
      name: "update-expression-byId",
      text: 'UPDATE "expression" SET "label" = $1 WHERE "id" = $2 RETURNING TRUE AS "updated"',
      values: [label, id]
    }
    const result = await client.query(query);
    return result.rows[0];
  },

  /**
   * Find all expressions
   * @returns {Array} - Set of objects representing available expressions
   */
  findAll: async () => {
    const query = {
      name: "select-expressions",
      text: 'SELECT * FROM "expression_with_relations"'
    }
    return await client.query(query);
  },

  /**
   * Finds one expression by ID
   * @param {Number} id - ID of the expression
   * @returns {Object} - Object representing the expression
   */
  findOneById: async id => {
    const query = {
      name: "select-expression-byId",
      text: 'SELECT * FROM "expression" WHERE "id" = $1',
      values: [id]
    };
    const results = await client.query(query);
    return results[0];
  },

  /**
   * Deletes one expression
   * @param {Number} id - id of the expression
   * @returns {Boolean} - True if success
   */
  deleteOne: async id => {
    const query = {
      name: "delete-expression-byId",
      text: 'DELETE FROM "expression" WHERE "id" = $1 RETURNING TRUE AS "deleted"',
      values: [id]
    };
    const result = await client.query(query);
    return result[0];
  }
};
