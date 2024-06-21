const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const User = require("../model/User.model");
const mongoose = require("mongoose");

const conn = mongoose.createConnection(process.env.MONGO_URL)
// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({username: req.params.username});
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Endpoint to upload an image

const uploadUserImage = async (req, res) => {
  const userId = req.params.userId;
  const {avatar, coverPhoto} = req.files;

  const updateData = {};
  if (avatar && avatar.length > 0) {
    updateData.profileBannerId = avatar[0].id;
  }
  if (coverPhoto && coverPhoto.length > 0) {
    updateData.coverPhotoId = coverPhoto[0].id;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {$set: updateData,},
    {new: true}
  )
  if (!user) {
    return res.status(404).json({message: "User not found"});
  }

  res.status(201).json({files: req.files});
}

module.exports = {getUser, uploadUserImage};
