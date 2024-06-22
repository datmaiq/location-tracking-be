const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const conn = mongoose.createConnection(process.env.MONGO_URL);
let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const getImage = (req, res) => {
  const { fileId } = req.params;
  const id = new mongoose.Types.ObjectId(fileId);
  gfs.files.find({ _id: id }).toArray(function (err, files) {
    if (err) {
      res.json(err);
    }
    if (files.length > 0) {
      let mime = files[0].contentType;
      let filename = files[0].filename;
      res.set("Content-Type", mime);
      res.set("Content-Disposition", "inline; filename=" + filename);
      let readStream = gfs.createReadStream({ _id: fileId });
      readStream.pipe(res);
    } else {
      res.json("File Not Found");
    }
  });
};

module.exports = { getImage };
