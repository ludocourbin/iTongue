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
          const socketIds = await getSockets(recipientId);
          for (const socketId of socketIds) {
            io.to(socketId).emit("message", {
              authorId: socket.user.id,
              authorName,
              authorAvatarUrl,
              text
            });
          }
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
          const socketIds = await getSockets(recipientId);
          for (const socketId of socketIds) {
            io.to(socketId).emit("typing", {
              authorName,
              authorId: socket.user.id
            });
          }
        } catch (err) {
          socket.emit("serverError", err);
          console.log(err);
        }
      }
    });

    socket.on("disconnect", () => {
      removeSocket(socket.user.id, socket.id).catch(err => {
        socket.emit("serverError", err);
        console.log(err);
      });
    });
  });
};

function getSockets(contactId) {
  return new Promise((resolve, reject) => {
    redis.client.smembers(redis.prefix + "active_socket:" + contactId, (err, socketIds) => {
      if (err) return reject(err);
      resolve(socketIds);
    });
  });
}

function storeSocket(userId, socketId) {
  return new Promise((resolve, reject) => {
    redis.client.sadd(redis.prefix + "active_socket:" + userId, socketId, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function removeSocket(userId, socketId) {
  return new Promise((resolve, reject) => {
    redis.client.srem(redis.prefix + "active_socket:" + userId, socketId, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
