const client = require("./");

module.exports = {
    insertOne: async user => {
        const fields = Object.keys(user);

        const query = {
            text: `INSERT INTO "user" (${fields}) VALUES (${fields.map(
                (_, i) => "$" + (i + 1)
            )}) RETURNING "id"`,
            values: Object.values(user)
        };

        const result = await client.query(query);

        return result.rows[0];
    },

    findAll: async filter => {
        const result = await client.query(filterQuery(filter));
        return result.rows;
    },

    findOne: async filter => {
        const query = filterQuery(filter);
        query.text += ' ORDER BY "id" DESC LIMIT 1';

        const result = await client.query(query);

        return result.rows[0];
    },

    findSlugs: async slug => {
        const query = {
            text: 'SELECT "slug" FROM "user" WHERE "slug" LIKE $1 ORDER BY "id" DESC',
            values: [slug + "%"]
        };

        const result = await client.query(query);

        return result.rows;
    }
};

function filterQuery(filter) {
    const start = `SELECT "u".*,
                      COALESCE(json_agg("r".*) FILTER(WHERE "r"."id" IS NOT NULL), '[]') AS "records",
                      COALESCE(json_agg("ul".*) FILTER(WHERE "ul"."name" IS NOT NULL), '[]') AS "languages"
                   FROM "user" "u"
              LEFT JOIN "record" "r"
                     ON "u"."id" = "r"."user_id"
              LEFT JOIN (SELECT "l"."id", "l".name, "l"."code", "lu"."role", "lu"."user_id"
                           FROM "language_user" "lu"
                           JOIN "language" "l" ON "lu"."language_id" = "l"."id") "ul"
                     ON "u"."id" = "ul"."user_id"`;

    let text = Object.keys(filter).reduce((query, field, i) => {
        query += i === 0 ? " WHERE " : " AND ";
        query += field + " " + filter[field].operator + " $" + (i + 1);
        return query;
    }, start);

    text += ' GROUP BY "u"."id"';

    const values = Object.values(filter).map(detail => detail.value);

    return { text, values };
}
