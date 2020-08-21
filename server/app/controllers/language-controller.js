const languageDatamapper = require("../db/language-datamapper");
const errorMiddleware = require("../middlewares/error-middleware");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { body } = req;
      const newLanguage = await languageDatamapper.create(body);
      res.status(201).json({ data: newLanguage });
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    }
  },

  getAll: async (req, res, next) => {
    try {  
      const languages = await languageDatamapper.findAll();
      if(!languages) return next();
      res.json({ data: languages });
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    }
  },
  
  todo: async (_, res) => {
    res.status(200).json({ data: 'todo' })
  }
}