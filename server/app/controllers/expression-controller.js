const expressionDatamapper = require("../db/expression-datamapper");
const errorMiddleware = require("../middlewares/error-middleware");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { label } = req.body;
      const newExpression = await expressionDatamapper.create(label);
      res.status(201).json({ data: newExpression });
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    }
  },

  update: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
			const { label } = req.body;
      const result = await expressionDatamapper.updateOne({ id, label});
      res.json({ data: result });
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    }
  },

  getAll: async (_, res, next) => {
    try {
      const result = await expressionDatamapper.findAll();
      res.json({ data: result });
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    }
	},
	
	getOneById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
			const result = await expressionDatamapper.findOneById(id);
			
			if(!result) return next();
      res.status(200).json({ data: result }); 
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    } 
  },

  deleteOne: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await expressionDatamapper.deleteOne(id);
      res.json({ data: result });
    } catch (err) {
      errorMiddleware.handleError(err, res, next);
    }
  },

  todo: async (_, res) => {
    res.status(200).json({ data: "todo" });
  }
};
