const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const User = require("../model/User.model");
const mongoose = require("mongoose");

const conn = mongoose.createConnection(process.env.MONGO_URL);

// Init gfs
let gfs;
conn.once("open", () => {
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Endpoint to upload an image
const uploadUserImage = async (req, res) => {
  const userId = req.params.userId;
  const { avatar, coverPhoto } = req.files;

  const updateData = {};
  if (avatar && avatar.length > 0) {
    const avatarId = avatar[0].id;
    const avatarUrl = `${req.protocol}://${req.get(
      "host"
    )}/users/file/${avatarId}`;
    updateData.profileBanner = avatarUrl;
    updateData.profileBannerId = avatarId;
  }
  if (coverPhoto && coverPhoto.length > 0) {
    const coverPhotoId = coverPhoto[0].id;
    const coverPhotoUrl = `${req.protocol}://${req.get(
      "host"
    )}/users/file/${coverPhotoId}`;

    updateData.coverPhoto = coverPhotoUrl;
    updateData.coverPhotoId = coverPhotoId;
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json({ files: req.files, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Endpoint to serve images by ID
const getImageById = (req, res) => {
  const fileId = new mongoose.Types.ObjectId(req.params.id);
  gfs.find({ _id: fileId }).toArray((err, files) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No file found" });
    }

    gfs.openDownloadStream(fileId).pipe(res);
  });
};

module.exports = { getUser, uploadUserImage, getImageById };
