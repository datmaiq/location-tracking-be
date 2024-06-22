const { getImage } = require("../controllers/images.controller");
const express = require("express");

const router = express.Router();

router.get("/:fileId", getImage);

module.exports = router;
