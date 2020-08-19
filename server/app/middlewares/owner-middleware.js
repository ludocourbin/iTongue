const authMiddleware = require("./auth-middleware");

module.exports = [
    authMiddleware,
    (req, res, next) => {
        if (!req.user.isAdmin && req.user.id != req.params.id)
            return res.status(403).json({
                errors: [{ msg: "Vous n'êtes pas autorisé à agir sur ce compte utilisateur" }]
            });

        next();
    }
];
