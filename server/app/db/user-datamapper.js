const client = require("./");

module.exports = {
    insertOne: async user => {
        const result = await client.query('SELECT insert_user($1) AS "id"', [user]);
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
        const result = await client.query('SELECT get_similar_slugs($1) AS "slug"', [slug]);
        return result.rows;
    }
};

function filterQuery(filter) {
    const text = Object.keys(filter).reduce((query, field, i) => {
        query += i === 0 ? " WHERE " : " AND ";
        query += field + " " + filter[field].operator + " $" + (i + 1);
        return query;
    }, 'SELECT * FROM "users"');

    const values = Object.values(filter).map(detail => detail.value);

    return { text, values };
}
