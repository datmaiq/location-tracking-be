// message.router.js

const express = require("express");
const {
  createMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/message.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

// TODO: temporarily disable auth middleware for testing, should enable again when testing completed
router.post("/", createMessage);
router.get("/:chatId", getMessages);
router.delete("/:messageId", deleteMessage);

module.exports = router;
