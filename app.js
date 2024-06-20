const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// routers
const authRouter = require("./routes/auth.router");
const autocompleteRouter = require("./routes/autocomplete.router");
const locationRouter = require("./routes/location.router");
const friendsRouter = require("./routes/friends.router");
const messageRouter = require("./routes/message.router");
const chatRouter = require("./routes/chat.router");
const usersRouter = require("./routes/users.router");

const PORT = process.env.PORT || 8000;
const app = express();
const { MONGO_URL } = process.env;

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Error connecting to the database:", err));

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/auth", authRouter);
app.use("/autocomplete", autocompleteRouter);
app.use("/locations", locationRouter);
app.use("/friends", friendsRouter);
app.use("/messages", messageRouter);
app.use("/chat", chatRouter);
app.use("/users", usersRouter);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("addUser", (userId) => {
    // add a user to the list
    addUser(userId, socket.id);
    // send the list of users to the client
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    // find the user that we want to send the message to
    console.log("hi", message, senderId);
    const user = users.find((user) => user.userId === receiverId);

    // send the message to the user
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      message,
    });
    console.log(senderId);
  });
  // when the user disconnects
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    // remove user from the list
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
});

// list of users
let users = [];

// add user to the list
function addUser(userId, socketId) {
  // if a user is not on the list, add it
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
}

server.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
