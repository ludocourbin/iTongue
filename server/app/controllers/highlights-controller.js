const client = require("../db");

module.exports = {
  getBestUsers: async (req, res, next) => {
    const limit = parseInt(req.params.limit, 10);
    const query = 'SELECT * FROM "users_with_more_records"($1)';
    try {
      const bestUsers = await client.query(query, [limit]);
      res.status(201).json({ data: bestUsers.rows });
    } catch (err) {
      next(err);
    }
  },
  
  getBestTranslations: async (req, res, next) => {
    const limit = parseInt(req.params.limit, 10);
    const query = 'SELECT * FROM "translations_with_more_records"($1)';
    try {
      const bestTranslations = await client.query(query, [limit]);
      res.status(201).json({ data: bestTranslations.rows });
    } catch (err) {
      next(err);
    }
  },

  todo: async (_, res) => {
    res.status(200).json({ data: "todo" });
  }
};
