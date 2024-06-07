const User = require("../model/User.model");

exports.getUser = async (req, res) => {
  try {
    const { params } = req;
    const { username } = params;

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "User found!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};