const client = require("./index");

module.exports = {
  /**
   * Creates a new translation
   * @returns {Boolean} - True if success
   */
  create: async ({ text, expression_id, language_id }) => {
    try {
      const query = {
        name: "create-translation",
        text: `
          INSERT INTO "translation"("text", "expression_id", "language_id")
               VALUES($1, $2, $3)
            RETURNING *
          `,
        values: [text, expression_id, language_id],
      };

      const result = await client.query(query);

      return result.rows[0];

    } catch (error) {
      console.log(error);
    }
  },
  
  /**
   * Updates an existing translation
   * @returns {Object} - Updated datas
   */
  updateOne: async (translation_id, { text, expression_id, language_id }) => {
    try {
      const query = {
        name: "update-translation",
        text: `
          UPDATE "translation"
             SET "text" = $1, 
                 "expression_id" = $2, 
                 "language_id" = $3
           WHERE "id" = $4
       RETURNING *
          `,
        values: [text, expression_id, language_id, translation_id],
      };

      const result = await client.query(query);

      return result.rows[0];

    } catch (error) {
      console.log(error);
    }
  },

  /**
   * This method returns all languages in database
   * @returns {Array.Object} - Set of objects representing available languages
   */
  findAll: async () => {
    try {
      const query = {
        name: "get-translations",
        text: `
          SELECT "t".*
            FROM "translation" "t"
        `,
        values: [],
      };

      const result = await client.query(query);

      if (!result.rows) {
        throw new Error("Unexpected issue: unable to get translations");
      }

      return result.rows;
    } catch (error) {
      console.log("Error", error);
    }
  },

  /**
   * This method returns asked translation
   * @property {String} id - Name of the translation
   * @returns {Object} - Object representing the translation
   */
  findOneById: async (id) => {
    try {
      const query = {
        name: "get-translation-by-id",
        text: `
          SELECT * 
            FROM "translation" 
           WHERE "id" = $1
          `,
        values: [id],
      };

      const result = await client.query(query);

      if (!result.rows) {
        throw new Error(`Unexpected issue: unable to get translation : ${id}`);
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
  * Deletes one translation
  * @param {Number} id - id of the translation
  * @returns {Boolean} - True if success
  */
 deleteOne: async id => {
   try {
     const query = {
       name: "delete-one-translation-by-id",
       text: `
         DELETE 
           FROM "translation" 
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
