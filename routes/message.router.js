// message.router.js

const express = require("express");
const {
  createMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/message.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", authMiddleware, createMessage);
router.get("/:chatId", authMiddleware, getMessages);
router.delete("/:messageId", authMiddleware, deleteMessage);

module.exports = router;
