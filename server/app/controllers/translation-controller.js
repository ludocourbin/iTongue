const translationDatamapper = require("../db/translation-datamapper");

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req;
      const newTranslation = await translationDatamapper.create(body);

      if(newTranslation.error) {
        return res.status(409).json({
          errors: [{ msg: newTranslation.error }]
        });
      }
      
      res.json({ data: newTranslation });

    } catch (error) {
      console.log(error)
    }
  },

  update: async (req, res) => {
    try {
      const { body } = req;
      const id = parseInt(req.params.id, 10);
      const newTranslation = await translationDatamapper.update(id, body);

      if(newTranslation.error) {
        return res.status(409).json({
          errors: [{ msg: newTranslation.error }]
        });
      }
      
      res.json({ data: newTranslation });

    } catch (error) {
      console.log(error)
    }
  },

  getAll: async (_, res) => {
    try {  
      const translations = await translationDatamapper.findAll();

      if (!translations) {
        res.status(404).json({
          data: "Unexpected error, no expression found"
        });
        return
      }

      res.status(200).json({ data: translations });

    } catch (error) {
      console.log(error)
    }
  },

  getOneById: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      const result = await translationDatamapper.findOneById(id);

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
      const result = await translationDatamapper.deleteOne(id);

      res.status(200).json({ data: result })

    } catch (error) {
      console.log(error)
    }
  },

  todo: async (_, res) => {
    res.status(200).json({ data: 'todo' })
  }
}