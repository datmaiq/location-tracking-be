// message.router.js

const express = require("express");
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/message.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/send", authMiddleware, sendMessage);
router.get("/:friendId", authMiddleware, getMessages);
router.delete("/:messageId", authMiddleware, deleteMessage);

module.exports = router;
