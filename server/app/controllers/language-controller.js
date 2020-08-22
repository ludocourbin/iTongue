const languageDatamapper = require("../db/language-datamapper");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { body } = req;
      const newLanguage = await languageDatamapper.create(body);
      res.status(201).json({ data: newLanguage });
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const languages = await languageDatamapper.findAll();
      if (!languages) return next();
      res.json({ data: languages });
    } catch (err) {
      next(err);
    }
  },

  todo: async (_, res) => {
    res.status(200).json({ data: "todo" });
  }
};
