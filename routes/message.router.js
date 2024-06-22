// message.router.js

const express = require("express");
const {
  createMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/message.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessages);
router.delete("/:messageId", deleteMessage);

module.exports = router;
