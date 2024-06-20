const express = require("express");
const { getUser, updateProfile } = require("../controllers/users.controller");

const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/:username", getUser);
router.put(
  "/:userId/profile",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]),
  updateProfile
);

module.exports = router;
