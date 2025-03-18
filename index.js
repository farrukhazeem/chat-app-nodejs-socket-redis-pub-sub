require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const { createSubscriber, createPublisher } = require("./src/config/redis");

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5173", //client Url
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
const PORT = process.env.PORT || 3000;

const subscriber = createSubscriber();
const publisher = createPublisher();

subscriber.subscribe("chat_channel");

subscriber.on("message", (channel, message) => {
  if (channel === "chat_channel") {
    io.emit("chat", message); // emit message to all connected clients
  }
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("chat", (data) => {
    console.log("Message received:", data);
    publisher.publish("chat_channel", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});