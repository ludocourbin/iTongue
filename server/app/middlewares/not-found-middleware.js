module.exports = (_, res) => {
  res.status(404).json({ errors: [{ msg: "Resource not found" }] });
};
