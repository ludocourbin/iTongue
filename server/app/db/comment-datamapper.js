const client = require("./");

const dataMapper = {
  getAllByRecordId: async (recordId, resultLimit) => {
    let limit = 3;
    if (resultLimit) {
      limit = resultLimit;
    }

    const query = {
      text: 'SELECT * FROM "get_comments"($1, $2)',
      values: [recordId, limit]
    };
    const result = await client.query(query);
    return result.rows;
  },

  getOneById: async commentId => {
    const query = {
      text: 'SELECT * FROM "record_comment" WHERE "id" = $1',
      values: [commentId]
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  insertOne: async (userId, recordId, comment) => {
    const query = {
      text:
        'INSERT INTO "record_comment" ("user_id", "record_id", "text") values($1, $2, $3) RETURNING "id"',
      values: [userId, recordId, comment]
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  updateOne: async (commentId, comment) => {
    const query = {
      text: 'UPDATE "record_comment" SET "text" = $2 WHERE "id" = $1',
      values: [commentId, comment]
    };
    const result = await client.query(query);
    return result.rowCount;
  },

  deleteOne: async commentId => {
    const query = {
      text: 'DELETE FROM "record_comment" WHERE "id" = $1',
      values: [commentId]
    };
    const result = await client.query(query);
    return result.rowCount;
  }
};

module.exports = dataMapper;
