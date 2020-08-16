const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // contenu du header sous la forme 'Bearer token'
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) return res.status(401).json({ errors: [{ msg: "Missing token" }] });

  // TODO vérifier si accessToken est enregistré en tant que jeton invalidé dans le store Redis

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ errors: [{ msg: "Invalid token" }] });

    req.user = user;

    next();
  });
};
