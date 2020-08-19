const jwt = require("jsonwebtoken");

const redis = require("../redis");

module.exports = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) return res.status(401).json({ errors: [{ msg: "Missing token" }] });

    try {
        if (await isInvalidToken(accessToken))
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

function isInvalidToken(token) {
    return new Promise((resolve, reject) => {
        redis.client.exists(redis.prefix + "invalid_token_" + token, (err, exists) => {
            if (err) return reject(err);
            resolve(exists);
        });
    });
}
