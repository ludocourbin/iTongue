const expressionDatamapper = require("../db/expression-datamapper");

module.exports = {
    create: async (req, res) => {
        try {
            const { label } = req.body;
            const newExpression = await expressionDatamapper.create(label);

            if (newExpression.error) {
                return res.status(409).json({
                    errors: [{ msg: newExpression.error }]
                });
            }
            
            res.status(201).json({ data: newExpression });

        } catch (error) {
            console.log(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const expressionId = req.params.id;
            if (isNaN(expressionId))
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Le paramètre reçu n'est pas valide" }] });

            await expressionDatamapper.updateOne({ id: expressionId, label: req.body.label });

            res.status(204).json({});
        } catch (err) {
            next(err);
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
        res.status(200).json({ data: "todo" });
    }
};
