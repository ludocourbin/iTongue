const languageDatamapper = require("../db/language-datamapper");

module.exports = {
  create: async (req, res) => {

    try {
      const { body } = req;
      const newLanguage = await languageDatamapper.create(body);

      if(newLanguage.error) {
        res.status(409).json({
          error: newLanguage.error
        });
        return;
      }

      res.json({ data: true });

    } catch (error) {
      console.log(error)
    }
  },

  getAll: async (req, res, next) => {
    try {  
      if(req.query.name || req.query.code) {
        next();
        return
      }
      const languages = await languageDatamapper.findAll();

      if (!languages) {
        res.status(400).json({
          data: "Unexpected error, no language found"
        });
        return
      }

      res.json({ data: languages });

    } catch (error) {
      console.log(error)
    }
  },
  
  todo: async (_, res) => {
    res.status(200).json({ data: 'todo' })
  }
}