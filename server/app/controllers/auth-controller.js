const jwt = require("jsonwebtoken");

const authUtils = require("../utils/auth-utils");

module.exports = {
    refresh: (req, res, next) => {
        const { refreshToken } = req.body;

        if (!refreshToken) return res.status(401).json({ errors: [{ msg: "Missing token" }] });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(403).json({ errors: [{ msg: "Invalid token" }] });

            try {
                const validToken = await authUtils.isValidRefreshToken(user, refreshToken);
                if (!validToken)
                    return res.status(403).json({ errors: [{ msg: "Invalid token" }] });

                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "20m"
                });
                res.json({ data: { accessToken } });
            } catch (err) {
                next(err);
            }
        });
    },

    invalidateAccessToken: async (req, res, next) => {
        const { accessToken } = req.body;

        if (!accessToken) return res.status(401).json({ errors: [{ msg: "Missing token" }] });

        try {
            await authUtils.invalidateAccessToken(accessToken);
            return res.status(201).json({});
        } catch (err) {
            next(err);
        }
    },

    invalidateRefreshToken: async (req, res, next) => {
        const { refreshToken } = req.body;

        if (!refreshToken) return res.status(401).json({ errors: [{ msg: "Missing token" }] });

        try {
            await authUtils.invalidateRefreshToken(refreshToken);
            return res.status(204).json({});
        } catch (err) {
            next(err);
        }
    }
};
