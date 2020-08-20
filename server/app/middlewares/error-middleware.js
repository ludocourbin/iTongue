const { DB_ERR_MSG_MAP, NODE_ERR_MSG_MAP } = require("../constants");

module.exports = {
  handleError: (err, next) => {
    err.displayMsg = DB_ERR_MSG_MAP[err.code] || NODE_ERR_MSG_MAP[err.code];
    err.displayMsg += ` (${err.toString()})`;
    next(err);
  }
};
