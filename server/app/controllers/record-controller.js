const recordDatamapper = require("../db/record-datamapper");

module.exports = {
  showAll: async (_, res, next) => {
    try {
      const records = await recordDatamapper.findAll();
      res.json({ data: records });
    } catch (err) {
      next(err);
    }
  }
};
