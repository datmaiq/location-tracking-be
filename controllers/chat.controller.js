const Chat = require("../model/Chat.model");

exports.createNewChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  const newChat = new Chat({
    users: [senderId, receiverId],
  });

  try {
    const savedChat = await newChat.save();

    res.status(200).json(savedChat);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getChatByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const chats = await Chat.find({
      users: { $in: [userId] },
    });

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getChatBetweenTwoUsers = async (req, res) => {
  const { firstUserId, secondUserId } = req.params;
  try {
    const chat = await Chat.findOne({
      users: { $all: [firstUserId, secondUserId] },
    });

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};
