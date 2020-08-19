const client = require("./");

module.exports = {
    insertOne: async user => {
        const result = await client.query('SELECT insert_user($1) AS "id"', [user]);
        return result.rows[0];
    },

    findAll: async (filter, withRelations = true) => {
        const table = withRelations ? "user_with_relations" : "user";
        const result = await client.query(filterQuery(`SELECT * FROM "${table}"`, filter));
        return result.rows;
    },

    showAll: async filter => {
        const result = await client.query(filterQuery('SELECT * FROM "user_display"', filter));
        return result.rows;
    },

    findOne: async (filter, withRelations = true) => {
        const table = withRelations ? "user_with_relations" : "user";
        const query = filterQuery(`SELECT * FROM "${table}"`, filter);
        query.text += ' ORDER BY "id" DESC LIMIT 1';

        const result = await client.query(query);
        return result.rows[0];
    },

    showOne: async filter => {
        const query = filterQuery('SELECT * FROM "user_display"', filter);
        query.text += ' ORDER BY "id" DESC LIMIT 1';

        const result = await client.query(query);
        return result.rows[0];
    },

    deleteOne: async id => {
        const result = await client.query('DELETE FROM "user" WHERE "id" = $1', [id]);
        return result.rowCount;
    },

    findSlugs: async slug => {
        const result = await client.query('SELECT get_similar_slugs($1) AS "slug"', [slug]);
        return result.rows;
    },

    findLanguage: async userLanguage => {
        const query = {
            text:
                'SELECT * FROM "language_user" WHERE "user_id" = $1 AND "language_id" = $2 AND "role" = $3 LIMIT 1',
            values: [userLanguage.languageId, userLanguage.userId, userLanguage.role]
        };

        const result = await client.query(query);
        return result.rows[0];
    },

    addLanguage: async userLanguage => {
        const query = {
            text:
                'INSERT INTO "language_user" ("language_id", "user_id", "role") VALUES ($1, $2, $3) RETURNING "id"',
            values: [userLanguage.languageId, userLanguage.userId, userLanguage.role]
        };

        const result = await client.query(query);
        return result.rows[0];
    }
};

function filterQuery(query, filter) {
    const text = Object.keys(filter).reduce((query, field, i) => {
        query += i === 0 ? " WHERE " : " AND ";
        query += field + " " + filter[field].operator + " $" + (i + 1);
        return query;
    }, query);

    const values = Object.values(filter).map(detail => detail.value);

    return { text, values };
}
