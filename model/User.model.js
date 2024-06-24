const mongoose = require("mongoose");
const locationSchema = require("./Location.model");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    profileBanner: String,
    coverPhoto: String,
    profileBannerId: String,
    coverPhotoId: String,
    currentLocation: locationSchema,
    locations: [locationSchema],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
