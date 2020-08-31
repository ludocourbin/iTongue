const client = require("./");

const dataMapper = {
  insertOne: async record => {
    const query = {
      text: `INSERT INTO "record" ("url", "user_id", "translation_id")
                  VALUES ($1, $2, $3)
               RETURNING "id"`,
      values: [record.url, record.userId, record.translationId]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  findOne: async (filter = {}) => {
    const query = {
      text: 'SELECT * FROM "get_records"($1) LIMIT 1',
      values: [filter]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  showOne: async (filter = {}) => {
    const query = {
      text: 'SELECT * FROM "show_records"($1) LIMIT 1',
      values: [filter]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  findByPk: id => dataMapper.findOne({ id: { operator: "=", value: id } }),

  showByPk: id => dataMapper.showOne({ id: { table: "r", operator: "=", value: id } }),

  findAll: async (filter = {}) => {
    const query = {
      text: 'SELECT * FROM "show_records"($1)',
      values: [filter]
    };
    const result = await client.query(query);
    return result.rows;
  },

  deleteOne: async recordId => {
    const result = await client.query('DELETE FROM "record" WHERE "id" = $1', [recordId]);
    return result.rowCount;
  }
};

module.exports = dataMapper;
