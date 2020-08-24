const client = require("./");

const queryUtils = require("../utils/query-utils");

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

  findOne: async filter => {
    const query = queryUtils.filter(`SELECT * FROM "record"`, filter);
    query.text += ' ORDER BY "id" DESC LIMIT 1';

    const result = await client.query(query);
    return result.rows[0];
  },

  showOne: async filter => {
    const query = queryUtils.filter(`SELECT * FROM "record_display"`, filter);
    query.text += ' ORDER BY "id" DESC LIMIT 1';

    const result = await client.query(query);
    return result.rows[0];
  },

  findByPk: id => dataMapper.findOne({ id: { operator: "=", value: id } }),

  findAll: async filter => {
    const result = await client.query(queryUtils.filter(`SELECT * FROM "record_display"`, filter));
    return result.rows;
  },

  deleteOne: async recordId => {
    const result = await client.query('DELETE FROM "record" WHERE "id" = $1', [recordId]);
    return result.rowCount;
  }
};

module.exports = dataMapper;
