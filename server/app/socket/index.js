const jwt = require("jsonwebtoken");

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

  io.on("connection", socket => {
    console.log("socket connexion", { socketId: socket.id, socketUser: socket.user });

    socket.on("message", async ({ text, recipient_id }) => {
      const chatroom = join(socket, socket.user.id, recipient_id);

      messageDatamapper
        .insertOne({
          text,
          sender_id: socket.user.id,
          recipient_id
        })
        .catch(err => {
          console.log(err);
        });

      socket.to(chatroom).emit("message", { chatroom, text });

      // uniquement pour tester l'affichage du message chez l'expéditeur
      io.in(chatroom).emit("message", { chatroom, text });
    });

    socket.on("typing", ({ name, recipient_id }) => {
      const chatroom = join(socket, socket.user.id, recipient_id);
      socket.to(chatroom).emit("typing", { chatroom, name });
    });
  });
};

function join(socket, senderId, recipientId) {
  const chatroom = "room:" + [senderId, recipientId].sort().join("-");
  if (!Object.keys(socket.rooms).includes(chatroom)) {
    socket.join(chatroom);
  }
  return chatroom;
}
