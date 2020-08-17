const client = require("./index");

module.exports = {
  /**
   * Creates a new translation
   * @returns {Boolean} - True if success
   */
  create: async (expression_id, text, language_id) => {
    try {
      const query = {
        name: "create-translation",
        text: `
          INSERT INTO "translation"("expression_id", "text", "language_id")
               VALUES($1, $2, $3)
            RETURNING *
          `,
        values: [expression_id, text, language_id],
      };

      const result = await client.query(query);
      console.log("New translation", result);

      return result.rows[0];

    } catch (error) {
      console.log(error);
    }
  },
};
