const client = require("./index");

module.exports = {
  /**
   * Creates a new expression
   * @property {Object} data - Needed datas
   * @returns {Boolean} - True if success
   */
  create: async ({ label, text, language_id }) => {
    
    const newClient = await client.connect();

    try {
      await newClient.query("BEGIN");
      const expressionQuery = {
        name: "create-expression",
        text: `
          INSERT INTO "expression"("label")
               VALUES($1)
            RETURNING id
          `,
        values: [label],
      };

      const expression = await newClient.query(expressionQuery);
      const expressionId = expression.rows[0].id;

      const translationQuery = {
        name: "create-first-translation",
        text: `
          INSERT INTO "translation"("text", "expression_id", "language_id")
               VALUES($1, $2, $3)
            RETURNING *
          `,
        values: [text, expressionId, language_id],
      };

      const translation = await newClient.query(translationQuery);

      await newClient.query("COMMIT");

      return translation.rows[0];

    } catch (error) {
      console.log(error);
      await newClient.query('ROLLBACK')
      if (error.code === "23505") {
        return { error: error.detail };
      }
      throw new Error(error)
    } finally {
      newClient.release();
    }
  },

  /**
   * This method returns all languages in database
   * @returns {Array.Object} - Set of objects representing available languages
   */
  findAll: async () => {
    try {
      const query = {
        name: "get-expressions",
        text: `
          SELECT "e".*, "t".*, "l"."code", "l"."name"
            FROM "expression" "e"
            JOIN "translation" "t" ON "t"."expression_id" = "e"."id"
            JOIN "language" "l" ON "t"."language_id" = "l"."id"
        `,
        values: [],
      };

      const result = await client.query(query);

      if (!result.rows) {
        throw new Error("Unexpected issue: unable to get languages");
      }

      return result.rows;
    } catch (error) {
      console.log("Error", error);
    }
  },

  /**
   * This method returns asked expression
   * @property {String} id - id of the expression
   * @returns {Object} - Object representing the expression
   */
  findOneById: async (id) => {
    try {
      const query = {
        name: "get-expression-by-id",
        text: `
          SELECT * 
            FROM "expression" 
           WHERE "id" = $1
          `,
        values: [id],
      };

      const result = await client.query(query);

      if (!result.rows) {
        throw new Error(`Unexpected issue: unable to get language : ${id}`);
      }

      if (result.rows.length === 0) {
        return {};
      }

      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
  },

  deleteOne: async (id) => {
    try {
      const query = {
        name: "delete-one-expression-by-id",
        text: `
          DELETE 
            FROM "expression" 
           WHERE "id" = $1
          `,
        values: [id],
      };

      await client.query(query);

      return true;
    } catch (error) {
      console.log(error);
    }
  },
};
