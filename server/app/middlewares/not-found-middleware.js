module.exports = (_, res) => {
  res.errorMsg = "Resource not found";
  res.status(404).json({ errors: [{ msg: res.errorMsg }] });
};
