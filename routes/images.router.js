const {getImage} = require("../controllers/images.controller");
const express = require("express");
// const {authMiddleware} = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/:fileId", getImage)

module.exports = router;