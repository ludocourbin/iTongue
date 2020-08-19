const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");

const redis = require("../redis");
const userDatamapper = require("../db/user-datamapper");

const { SALT_ROUNDS } = require("../constants");

module.exports = {
    showAll: async (_, res, next) => {
        try {
            const users = await userDatamapper.showAll({});

            res.json({ data: users });
        } catch (err) {
            next(err);
        }
    },

    showOne: async (req, res, next) => {
        const userId = req.params.id;
        if (isNaN(userId))
            return res
                .status(400)
                .json({ errors: [{ msg: "Le paramètre reçu n'est pas valide" }] });

        try {
            const user = await userDatamapper.showOne({ id: { operator: "=", value: userId } });
            if (!user) return next();
            res.json({ data: user });
        } catch (err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        try {
            const { email, password, firstname, lastname } = req.body;

            const user = await userDatamapper.findOne(
                { email: { operator: "=", value: email } },
                false
            );

            if (user)
                return res.status(409).json({ errors: [{ msg: "L'adresse email existe déjà" }] });

            let userSlug = slugify(firstname + " " + lastname, { lower: true });
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

    deleteOne: async (req, res, next) => {
        const userId = req.params.id;
        if (isNaN(userId))
            return res
                .status(400)
                .json({ errors: [{ msg: "Le paramètre reçu n'est pas valide" }] });

        try {
            await userDatamapper.deleteOne(userId);
            res.status(204).json({});
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

                const { avatar_url: avatarUrl, is_admin: isAdmin, created_at: createdAt } = user;
                const { id, email, firstname, lastname, slug, records, languages } = user;
                const display_user = {
                    id,
                    email,
                    firstname,
                    lastname,
                    slug,
                    avatarUrl,
                    isAdmin,
                    createdAt,
                    records,
                    languages
                };

                return res.json({ data: { accessToken, refreshToken, user: display_user } });
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
