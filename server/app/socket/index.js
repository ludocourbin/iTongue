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
    try {
      await storeSocket(socket.user.id, socket.id);
    } catch (err) {
      socket.emit("serverError", err);
      console.log(err);
    }

    socket.on("message", async ({ authorName, authorAvatarUrl, text, recipientId }) => {
      messageDatamapper
        .insertOne({
          text,
          sender_id: socket.user.id,
          recipient_id: recipientId
        })
        .catch(err => {
          socket.emit("serverError", err);
          console.log(err);
        });

      if (socket.user.id != recipientId) {
        try {
          io.to(await getSocket(recipientId)).emit("message", {
            authorId: socket.user.id,
            authorName,
            authorAvatarUrl,
            text
          });
        } catch (err) {
          socket.emit("serverError", err);
          console.log(err);
        }
      } else {
        socket.emit(
          "serverError",
          new Error("Un utilisateur ne peut être à la fois expéditeur et destinataire")
        );
      }
    });

    socket.on("typing", async ({ authorName, recipientId }) => {
      if (socket.user.id != recipientId) {
        try {
          io.to(await getSocket(recipientId)).emit("typing", {
            authorName,
            authorId: socket.user.id
          });
        } catch (err) {
          socket.emit("serverError", err);
          console.log(err);
        }
      }
    });

    socket.on("disconnect", () => {
      removeSocket(socket.user.id).catch(err => {
        socket.emit("serverError", err);
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
