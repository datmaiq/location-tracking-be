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

const PORT = process.env.PORT || 8000;
const app = express();
const { MONGO_URL } = process.env;

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
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use("/auth", authRouter);
app.use("/autocomplete", autocompleteRouter);
app.use("/locations", locationRouter);
app.use("/friends", friendsRouter);
app.use("/message", messageRouter);
app.use("/chat", chatRouter);

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
