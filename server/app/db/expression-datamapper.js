const client = require("./index");

module.exports = {
    /**
     * Creates a new expression
     * @param {String} label - Label of the expression
     * @returns {Object} - Object containing relative datas for the new expression
     * @returns {Error} - If label already exists
     */
    create: async label => {
        try {
            const query = {
                name: "create-expression",
                text: `
          INSERT INTO "expression"("label")
               VALUES($1)
            RETURNING *
          `,
                values: [label]
            };

            const result = await client.query(query);
            return result.rows[0];
        } catch (error) {
            console.log(error);
            if (error.code === "23505") {
                return { error: error.detail };
            }
        }
    },

    /**
     * Updates an expression
     * @param {Number} id - Label of the expression
     * @param {String} label - Label of the expression
     * @returns {Object} - Object containing relative datas for the new expression
     * @returns {Error} - If label already exists
     */
    updateOne: async expression => {
        const query = {
            name: "update-expression",
            text: `
          UPDATE "expression"
             SET "label" = $1
           WHERE "id" = $2
        `,
            values: [expression.label, expression.id]
        };

        const result = await client.query(query);
        return result.rowCount;
    },

    /**
     * This method returns all languages in database
     * @returns {Array} - Set of objects representing available languages
     */
    findAll: async () => {
        try {
            const result = await client.query('SELECT * FROM "expression_with_relations"');
            return result.rows;
        } catch (err) {
            // next(err);
        }
    },

    /**
     * This method returns asked expression
     * @param {Number} id - Name of the expression
     * @returns {Object} - Object representing the expression
     */
    findOneById: async id => {
        try {
            const query = {
                name: "get-expression-by-id",
                text: `
          SELECT * 
            FROM "expression" 
           WHERE "id" = $1
          `,
                values: [id]
            };

            const result = await client.query(query);

            if (!result.rows) {
                throw new Error(`Unexpected issue: unable to get language : ${name}`);
            }

            if (result.rows.length === 0) {
                return {};
            }

            return result.rows[0];
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Deletes one expression
     * @param {Number} id - id of the expression
     * @returns {Boolean} - True if success
     */
    deleteOne: async id => {
        try {
            const query = {
                name: "delete-one-expression-by-id",
                text: `
          DELETE 
            FROM "expression" 
           WHERE "id" = $1
          `,
                values: [id]
            };

            await client.query(query);
            return true;
        } catch (error) {
            console.log(error);
        }
    }
};