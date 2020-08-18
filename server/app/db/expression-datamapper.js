const client = require("./index");

module.exports = {
    /**
     * Creates a new expression
     * @property {Object} data - Needed datas
     * @returns {Boolean} - True if success
     */
    create: async label => {
        console.log("label", label);
        try {
            const query = {
                name: "create-expression",
                text: `
          INSERT INTO "expression"("label")
               VALUES($1)
            RETURNING id
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
     * This method returns all languages in database
     * @returns {Array.Object} - Set of objects representing available languages
     */
    findAll: async () => {
        try {
            const result = await client.query('SELECT * FROM "expression_with_relations"');
            return result.rows;
        } catch (err) {
            next(err);
        }
    },

    /**
     * This method returns asked language
     * @property {String} name - Name of the language
     * @returns {Object} - Object representing the language
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
