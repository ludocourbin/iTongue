const translationDatamapper = require("../db/translation-datamapper");
const errorMiddleware = require("../middlewares/error-middleware");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { body } = req;
      const newTranslation = await translationDatamapper.create(body);
      res.status(201).json({ data: newTranslation });
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    }
  },

  update: async (req, res, next) => {
    try {
      const { body } = req;
      const id = parseInt(req.params.id, 10);
      const newTranslation = await translationDatamapper.updateOne(id, body);
      res.json({ data: newTranslation });
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    }
  },

  getAll: async (_, res, next) => {
    try {  
      const translations = await translationDatamapper.findAll();
      res.status(200).json({ data: translations });
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    }
  },

  getOneById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await translationDatamapper.findOneById(id);
      
      if(!result) return next();
      res.status(200).json({ data: result }); 
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    } 
  },

  deleteOne: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await translationDatamapper.deleteOne(id);
      res.status(200).json({ data: result })
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    }
  },

  todo: async (_, res) => {
    res.status(200).json({ data: 'todo' })
  }
}