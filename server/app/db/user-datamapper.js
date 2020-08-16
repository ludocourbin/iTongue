const client = require("./");

module.exports = {
  insertOne: async user => {
    const fields = Object.keys(user);

    const query = {
      text: `INSERT INTO "user" (${fields}) VALUES (${fields.map((_, i) => "$" + (i + 1))}) RETURNING "id"`,
      values: Object.values(user)
    };

    const result = await client.query(query);

    return result.rows[0];
  },

  findOne: async filter => {
    let query = Object.keys(filter).reduce((qry, field, i) => {
      qry += i === 0 ? " WHERE " : " AND ";
      qry += field + " " + filter[field].operator + " $" + (i + 1);
      return qry;
    }, 'SELECT * FROM "user"');

    query += 'ORDER BY "id" DESC LIMIT 1';

    const result = await client.query(
      query,
      Object.values(filter).map(detail => detail.value)
    );

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
