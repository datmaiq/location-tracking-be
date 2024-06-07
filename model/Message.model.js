// Message.model.js

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    sender: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Message", messageSchema);
