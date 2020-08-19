const jwt = require("jsonwebtoken");

const redis = require("../redis");

module.exports = {
  refresh: (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ errors: [{ msg: "Missing token" }] });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(403).json({ errors: [{ msg: "Invalid token" }] });

      try {
        const validToken = await isValid(user, refreshToken);
        if (!validToken) return res.status(403).json({ errors: [{ msg: "Invalid token" }] });

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" });
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
      await invalidateAccess(accessToken);
      return res.status(201).json({});
    } catch (err) {
      next(err);
    }
  },

  invalidateRefreshToken: async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ errors: [{ msg: "Missing token" }] });

    try {
      await invalidateRefresh(refreshToken);
      return res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
};

function isValid(user, token) {
  return new Promise((resolve, reject) => {
    redis.client.hget(redis.prefix + "refresh_tokens", user.id, (err, result) => {
      if (err) return reject(err);
      resolve(result === token);
    });
  });
}

function invalidateAccess(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) return reject(err);

      const redisKey = redis.prefix + "invalid_token_" + token;

      if (payload.exp) {
        const remainingMs = payload.exp * 1000 - Date.now();
        redis.client.setex(redisKey, Math.round(remainingMs / 1000), 1, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      } else {
        redis.client.set(redisKey, 1, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      }
    });
  });
}

function invalidateRefresh(token) {
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
