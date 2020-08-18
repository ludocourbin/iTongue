const expressionDatamapper = require("../db/expression-datamapper");

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req;
      const newExpression = await expressionDatamapper.create(body);

      if(newExpression.error) {
        return res.status(409).json({
          errors: [{ msg: newExpression.error }]
        });
      }
      
      res.json({ data: newExpression });

    } catch (error) {
      console.log(error)
    }
  },

  getAll: async (_, res) => {
    try {  
      const expressions = await expressionDatamapper.findAll();

      if (!expressions) {
        res.status(404).json({
          data: "Unexpected error, no expression found"
        });
        return
      }

      res.status(200).json({ data: expressions });

    } catch (error) {
      console.log(error)
    }
  },

  getOneById: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      const result = await expressionDatamapper.findOneById(id);

      res.status(200).json({
        data: result
      })

    } catch (error) {
      console.log(error)
    }
      
  },

  deleteOneById: async (req, res) => {
    try {
      
      const id = parseInt(req.params.id, 10);
      const result = await expressionDatamapper.deleteOne(id);

      res.status(200).json({ data: result })

    } catch (error) {
      console.log(error)
    }
  },

  todo: async (_, res) => {
    res.status(200).json({ data: 'todo' })
  }
}