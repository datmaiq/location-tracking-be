const express = require("express");
const {getUser} = require("../controllers/users.controller");

const router = express.Router();

router.get("/:username", getUser);

module.exports = router;