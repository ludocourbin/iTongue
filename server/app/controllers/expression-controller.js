const expressionDatamapper = require("../db/expression-datamapper");

module.exports = {
  create: async (req, res) => {
    try {
      const { label } = req.body;
      const newExpression = await expressionDatamapper.create(label);

      if(newExpression.error) {
        return res.status(409).json({
          errors: [{ msg: newExpression.error }]
        });
      }
      console.log("newExpression", newExpression);
      res.json({ data: newExpression });

    } catch (error) {
      console.log(error)
    }
  },
  
  update: async (req, res) => {
    try {
      const { label } = req.body;
      const id = parseInt(req.params.id, 10);
      const updatedExpression = await expressionDatamapper.updateOne(id, label);

      if(updatedExpression.error) {
        return res.status(409).json({
          errors: [{ msg: "Error while trying to update" }]
        });
      }
      res.json({ data: updatedExpression });

    } catch (error) {
      console.log(error)
    }
  },

  getAll: async (_, res, next) => {
      try {
          const result = await expressionDatamapper.findAll();
          res.json({ data: result });
      } catch (err) {
          next(err);
      }
  },

  deleteOne: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await expressionDatamapper.deleteOne(id);
      res.json({ data: result });
    } catch (error) {
      next(err);
    }
  },

  todo: async (_, res) => {
    res.status(200).json({ data: 'todo' })
  }
};
