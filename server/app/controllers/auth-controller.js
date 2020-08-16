const jwt = require("jsonwebtoken");

module.exports = {
  refresh: (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ errors: [{ msg: "Missing token" }] });

    // TODO vérifier que le refreshToken existe dans la liste Redis
    // if(notExists) return res.status(403).json({ errors: [{ msg: "Invalid token" }] });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ errors: [{ msg: "Invalid token" }] });

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" });
      res.json({ data: { accessToken } });
    });
  }
};
