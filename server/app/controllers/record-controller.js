const recordDatamapper = require("../db/record-datamapper");

const errorMiddleware = require("../middlewares/error-middleware");

module.exports = {
  showAll: async (_, res, next) => {
    try {
      const records = await recordDatamapper.findAll({});
      res.json({ data: records });
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    }
  }
};
