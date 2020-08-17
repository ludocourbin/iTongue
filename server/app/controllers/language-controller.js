const { validationResult } = require("express-validator");
const languageDatamapper = require("../db/language-datamapper");

module.exports = {
  create: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    };

    try {
      const { body } = req;
      const newLanguage = await languageDatamapper.create(body);

      if(newLanguage.error) {
        res.status(409).json({
          error: newLanguage.error
        });
        return;
      }

      res.status(200).json({ data: true });

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

      res.status(200).json({data: languages});

    } catch (error) {
      console.log(error)
    }
  },

  getOneByName: async (req, res, next) => {
    try {
      if(req.query.code) {
        next();
        return
      }
      const { name } = req.query;

      if(!name) {
        const key = Object.keys(req.query)[0];
        res.status(400).json({ error: `Unknown key : '${key}' ` })
      }

      const result = await languageDatamapper.findOneByName(name);

      res.status(200).json({
        data: result
      })

    } catch (error) {
      
    }
      
  },

  getOneByCode: async (req, res) => {
    try {
      const { code } = req.query;

      const result = await languageDatamapper.findOneByCode(code);
      console.log(result);

      res.status(200).json({
        data: result
      })

    } catch (error) {
      console.log(error)
    }
  },
  
  todo: async (_, res) => {
    res.status(200).json({ data: 'todo' })
  }
}