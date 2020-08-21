const { DB_ERR_MAP, NODE_ERR_MAP } = require("../constants");

module.exports = {
  handleError: (err, res, next) => {
    err.displayMsg =
      (DB_ERR_MAP[err.code] && DB_ERR_MAP[err.code].msg) ||
      (NODE_ERR_MAP[err.code] && NODE_ERR_MAP[err.code].msg);

    if (err.displayMsg) {
      err.displayMsg += ` (${err.toString()})`;
    }

    res.statusCode =
      (DB_ERR_MAP[err.code] && DB_ERR_MAP[err.code].code) ||
      (NODE_ERR_MAP[err.code] && NODE_ERR_MAP[err.code].code);

    next(err);
  }
};
