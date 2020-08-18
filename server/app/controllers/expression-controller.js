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
           const result = await expressionDatamapper.findAll();

           res.json({ data: result });
        } catch (err) {
            next(err);
        }
    }
};
