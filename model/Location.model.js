const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: { type: String },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

module.exports = locationSchema;
