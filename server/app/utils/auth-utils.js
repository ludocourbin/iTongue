const jwt = require("jsonwebtoken");
const redis = require("../redis");

module.exports = {
    getAccessToken: req => {
        const authHeader = req.headers["authorization"];
        return authHeader && authHeader.split(" ")[1];
    },

    getNewTokenPair: async user => {
        const payload = {
            id: user.id,
            email: user.email,
            slug: user.slug,
            avatarUrl: user.avatar_url,
            isAdmin: user.is_admin
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "20m"
        });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

        await storeRefreshToken(user, refreshToken);

        return [accessToken, refreshToken];
    },

    isBlacklistedToken: token => {
        return new Promise((resolve, reject) => {
            redis.client.exists(redis.prefix + "invalid_token_" + token, (err, exists) => {
                if (err) return reject(err);
                resolve(exists);
            });
        });
    },

    isValidRefreshToken: (user, token) => {
        return new Promise((resolve, reject) => {
            redis.client.hget(redis.prefix + "refresh_tokens", user.id, (err, result) => {
                if (err) return reject(err);
                resolve(result === token);
            });
        });
    },

    invalidateAccessToken: token => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) return reject(err);

                const redisKey = redis.prefix + "invalid_token_" + token;

                if (payload.exp) {
                    const remainingMs = payload.exp * 1000 - Date.now();
                    redis.client.setex(
                        redisKey,
                        Math.round(remainingMs / 1000),
                        1,
                        (err, result) => {
                            if (err) return reject(err);
                            resolve(result);
                        }
                    );
                } else {
                    redis.client.set(redisKey, 1, (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    });
                }
            });
        });
    },

    invalidateRefreshToken: token => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return reject(err);

                redis.client.hdel(redis.prefix + "refresh_tokens", user.id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });
    }
};

async function storeRefreshToken(user, token) {
    return new Promise((resolve, reject) => {
        redis.client.hmset(redis.prefix + "refresh_tokens", user.id, token, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}
