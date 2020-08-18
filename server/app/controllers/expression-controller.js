const { validationResult } = require("express-validator");
const expressionDatamapper = require("../db/expression-datamapper");
const translationDatamapper = require("../db/translation-datamapper");

module.exports = {
    create: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const { label, text, language_id } = req.body;
            const newExpression = await expressionDatamapper.create(label);

            if (newExpression.error) {
                res.status(409).json({
                    error: newExpression.error
                });
                return;
            }

            const newTranslation = await translationDatamapper.create(
                newExpression.id,
                text,
                language_id
            );

            res.status(200).json({ data: newTranslation });
        } catch (error) {
            console.log(error);
        }
    },

    getAll: async (_, res) => {
        try {
            const result = await expressionDatamapper.findAll();

            res.json({ data: result });
        } catch (err) {
            next(err);
        }
    },

    getOneById: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);

            const result = await expressionDatamapper.findOneById(id);

            res.status(200).json({
                data: result
            });
        } catch (error) {
            console.log(error);
        }
    },

    deleteOneById: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await expressionDatamapper.deleteOne(id);

            res.status(200).json({ data: result });
        } catch (error) {
            console.log(error);
        }
    },

    todo: async (_, res) => {
        res.status(200).json({ data: "todo" });
    }
};
