const express = require("express");
const {
  addLocation,
  getLocationCsvData,
  deleteLocation,
  editLocation,
} = require("../controllers/location.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("", authMiddleware, addLocation);
router.put("/:locationId", authMiddleware, editLocation);
router.delete("/:locationId", authMiddleware, deleteLocation);
router.get("/csv-data", authMiddleware, getLocationCsvData);

module.exports = router;