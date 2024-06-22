const express = require("express");
const {
  createNewChat,
  getChatByUserId,
  getChatBetweenTwoUsers,
} = require("../controllers/chat.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

// TODO: temporarily disable auth middleware for testing, should enable again when testing completed
router.post("/", createNewChat);
router.get("/:userId", getChatByUserId);
router.get("/:firstUserId/:secondUserId", getChatBetweenTwoUsers);

module.exports = router;