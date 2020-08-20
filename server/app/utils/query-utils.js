module.exports = {
  filter: (query, filter) => {
    const text = Object.keys(filter).reduce((query, field, i) => {
      query += i === 0 ? " WHERE " : " AND ";
      query += field + " " + filter[field].operator + " $" + (i + 1);
      return query;
    }, query);

    const values = Object.values(filter).map(detail => detail.value);

    return { text, values };
  }
};
