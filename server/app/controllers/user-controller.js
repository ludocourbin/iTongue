const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");

const redis = require("../redis");
const userDatamapper = require("../db/user-datamapper");

const { SALT_ROUNDS } = require("../constants");

module.exports = {
    getAll: async (_, res, next) => {
        try {
            const users = await userDatamapper.findAll({});
            res.json({ data: users });
        } catch (err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        try {
            const { email, password, firstname, lastname } = req.body;

            const user = await userDatamapper.findOne({ email: { operator: "=", value: email } });

            if (user)
                return res.status(409).json({ errors: [{ msg: "L'adresse email existe déjà" }] });

            let userSlug = slugify(firstname + " " + lastname);
            const slugsRows = await userDatamapper.findSlugs(userSlug);
            const slugs = slugsRows.map(row => row.slug);

            if (slugs.includes(userSlug)) {
                const lastSuffixInDb = slugs[0].match(/\d+$/);
                const suffix = lastSuffixInDb ? parseInt(lastSuffixInDb[0], 10) + 1 : 1;
                userSlug += suffix;
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            const result = await userDatamapper.insertOne({
                email,
                password: hashedPassword,
                firstname,
                lastname,
                slug: userSlug
            });

            res.json({ data: result });
        } catch (err) {
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await userDatamapper.findOne({ email: { operator: "=", value: email } });

            if (user && (await bcrypt.compare(password, user.password))) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    slug: user.slug,
                    isAdmin: user.is_admin
                };
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "20m"
                });
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

                await storeRefreshToken(user, refreshToken);

                return res.json({ data: { accessToken, refreshToken } });
            }

            res.status(401).json({ errors: [{ msg: "Not allowed" }] });
        } catch (err) {
            next(err);
        }
    }
};

function storeRefreshToken(user, token) {
    return new Promise((resolve, reject) => {
        redis.client.hmset(redis.prefix + "refresh_tokens", user.id, token, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}
