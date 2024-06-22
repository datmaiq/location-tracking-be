const parser = require("papaparse");
const User = require("../model/User.model");

exports.getOthers = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "User does not exist",
        data: null,
      });
    }

    const { friends } = user;

    const otherUsers = await User.find({
      _id: { $ne: userId },
    });

    const potentialFriends = otherUsers.filter((otherUser) => {
      for (const friendId of friends) {
        if (otherUser._id.equals(friendId)) {
          return false;
        }
      }
      return true;
    });

    res.status(200).json({
      message: "Potential Friends",
      data: potentialFriends,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

exports.addFriend = async (req, res) => {
  try {
    const { _id } = req.user;

    const { id: newfriendId } = req.body;

    const { friends } = await User.findById(_id);

    for (const friend of friends) {
      if (friend._id.equals(newfriendId)) {
        return res
          .status(400)
          .json({ message: "This user is already friends with you!" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $push: {
          friends: newfriendId,
        },
      },
      { new: true, useFindAndModify: false }
    ).populate("friends");

    res.status(200).json({
      message: "Friend added successfully!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

exports.getFriendsCsvData = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id).populate("friends");

    const { friends } = user;

    const formattedData = friends.map((friend) => ({
      Name: friend.username,
      Gender: friend.gender,
      Location: friend.currentLocation.name,
      friends: friend.friends.length,
      visited: friend.locations
        .map((location, index) => `${index + 1}. ${location.name}`)
        .join("\n"),
    }));

    const csv = parser.unparse(formattedData, {
      header: true,
    });

    res.header("Content-Type", "text/csv");

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
