const client = require("../db");

module.exports = {
  getBestUsers: async (req, res, next) => {
    const limit = parseInt(req.params.limit, 10);
    const query = 'SELECT * FROM "users_with_more_irecords"($1)';
    try {
      const bestUsers = await client.query(query, [limit]);
      res.json({ data: bestUsers.rows });
    } catch (err) {
      next(err);
    }
  },
  
  getBestTranslations: async (req, res, next) => {
    const limit = parseInt(req.params.limit, 10);
    const query = 'SELECT * FROM "translations_with_more_irecords"($1)';
    try {
      const bestTranslations = await client.query(query, [limit]);
      res.json({ data: bestTranslations.rows });
    } catch (err) {
      next(err);
    }
  },

  getLastiRecords: async (req, res, next) => {
    const limit = parseInt(req.params.limit, 10);
    // const query = 'SELECT * FROM "record_display"';
    const query = 'SELECT * FROM "last_irecords"($1)';
    try {
      // const lastIrecords = await client.query(query);
      const lastIrecords = await client.query(query, [limit]);
      res.json({ data: lastIrecords.rows });
    } catch (err) {
      next(err);
    }
  },

  todo: async (_, res) => {
    res.status(200).json({ data: "todo" });
  }
};
