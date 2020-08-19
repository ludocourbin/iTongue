const jwt = require("jsonwebtoken");

const authUtils = require("../utils/auth-utils");

module.exports = async (req, res, next) => {
    const accessToken = authUtils.getAccessToken(req);

    if (!accessToken) return res.status(401).json({ errors: [{ msg: "Missing token" }] });

    try {
        if (await authUtils.isBlacklistedToken(accessToken))
            return res.status(403).json({ errors: [{ msg: "Invalid token" }] });

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ errors: [{ msg: "Invalid token" }] });

            req.user = user;
            next();
        });
    } catch (err) {
        next(err);
    }
};
