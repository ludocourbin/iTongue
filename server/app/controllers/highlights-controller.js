const highlightsDatamapper = require("../db/highlights-datamapper");

module.exports = {
  getBestUsers: async (req, res, next) => {
    const limit = parseInt(req.params.limit, 10);
    try {
      const bestUsers = await highlightsDatamapper.getBestUsers(query, [limit]);
      res.json({ data: bestUsers });
    } catch (err) {
      next(err);
    }
  },

  getBestTranslations: async (req, res, next) => {
    const limit = parseInt(req.params.limit, 10);
    try {
      const bestTranslations = await highlightsDatamapper.getBestTranslations(query, [limit]);
      res.json({ data: bestTranslations });
    } catch (err) {
      next(err);
    }
  },

  getLastiRecords: async (req, res, next) => {
    try {
      const lastIrecords = await highlightsDatamapper.getLastiRecords();
      res.json({ data: lastIrecords });
    } catch (err) {
      next(err);
    }
  }
};
