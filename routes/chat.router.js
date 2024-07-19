const express = require("express");
const {
  createNewChat,
  getChatByUserId,
  getChatBetweenTwoUsers,
} = require("../controllers/chat.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createNewChat);
router.get("/:userId", authMiddleware, getChatByUserId);
router.get(
  "/:firstUserId/:secondUserId",
  authMiddleware,
  getChatBetweenTwoUsers
);

module.exports = router;
