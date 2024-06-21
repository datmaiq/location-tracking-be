const express = require("express");
const {
  getUser,
  uploadUserImage,
  getImageById,
} = require("../controllers/users.controller");

const router = express.Router();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { authMiddleware } = require("../middlewares/auth.middleware");
const upload = multer({ dest: "uploads/" });

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});
const uploadV2 = multer({ storage });

router.get("/:username", getUser);
router.post(
  "/:userId/profile",
  // authMiddleware,
  // (req, res, next) => {
  //   const { _id } = req.user;
  //   if (_id !== req.params.userId) {
  //     return res.status(401).json({
  //       message: 'Unauthorized',
  //       data: null,
  //     });
  //   }
  //
  //   return next();
  // },
  uploadV2.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]),
  uploadUserImage
);

router.get("/file/:id", getImageById);

module.exports = router;
