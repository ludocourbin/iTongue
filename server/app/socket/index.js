const jwt = require("jsonwebtoken");

const redis = require("../redis");
const authUtils = require("../utils/auth-utils");
const messageDatamapper = require("../db/message-datamapper");

module.exports = io => {
  io.use(async (socket, next) => {
    if (!socket.handshake.query || !socket.handshake.query.token)
      return next(new Error("L'access token est manquant"));

    const accessToken = socket.handshake.query.token;

    try {
      if (await authUtils.isBlacklistedToken(accessToken))
        return next(new Error("L'access token n'est plus valide"));

      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return next(new Error("L'access token n'est plus valide"));

        socket.user = user;
        next();
      });
    } catch (err) {
      next(err);
    }
  });

  io.on("connect", async socket => {
    await storeSocket(socket.user.id, socket.id);

    socket.on("message", async ({ text, recipient_id }) => {
      messageDatamapper
        .insertOne({
          text,
          sender_id: socket.user.id,
          recipient_id
        })
        .catch(err => {
          console.log(err);
        });

      try {
        io.to(await getSocket(recipient_id)).emit("message", { text, contactId: socket.user.id });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("typing", async ({ recipient_id }) => {
      try {
        io.to(await getSocket(recipient_id)).emit("typing", { contactId: socket.user.id });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      removeSocket(socket.user.id).catch(err => {
        console.log(err);
      });
    });
  });
};

function getSocket(contactId) {
  return new Promise((resolve, reject) => {
    redis.client.hget(redis.prefix + "active_sockets", contactId, (err, socketId) => {
      if (err) return reject(err);
      resolve(socketId);
    });
  });
}

function storeSocket(userId, socketId) {
  return new Promise((resolve, reject) => {
    redis.client.hmset(redis.prefix + "active_sockets", userId, socketId, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function removeSocket(userId) {
  return new Promise((resolve, reject) => {
    redis.client.hdel(redis.prefix + "active_sockets", userId, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
