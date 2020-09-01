const app = require("../app");
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = socketIO(server, {});

io.on("connection", socket => {
  console.log("socket connexion", socket.id);

  socket.on("message", async ({ text, senderId, recipientId }) => {
    const chatroom = join(socket, senderId, recipientId);

    const now = new Date();
    try {
      await chatDatamapper.insertMessage({ text, senderId, recipientId, created_at: now });
    } catch (err) {
      console.log(err);
    }
    socket.to(chatroom).emit(chatroom + "-message", { text, senderId, created_at: now });
  });

  socket.on("typing", ({ name, room_id }) => {
    const chatroom = join(socket, room_id);
    socket.to(chatroom).emit(chatroom + "-typing", name);
  });
});

function join(socket, senderId, recipientId) {
  const chatroom = "room:" + [senderId, recipientId].sort().join("-");
  if (!Object.keys(socket.rooms).includes(chatroom)) {
    socket.join(chatroom);
  }
  return chatroom;
}
