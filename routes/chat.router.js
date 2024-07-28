const express = require("express");
const {
  createNewChat,
  getChatByUserId,
  getChatBetweenTwoUsers,
} = require("../controllers/chat.controller");

const router = express.Router();

router.post("/", createNewChat);
router.get("/:userId", getChatByUserId);
router.get(
  "/:firstUserId/:secondUserId",

  getChatBetweenTwoUsers
);

module.exports = router;
