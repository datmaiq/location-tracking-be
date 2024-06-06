const Chat = require("../model/Chat.model");

exports.createNewChat = async (req, res) => {
  const {
    senderId, receiverId
  } = req.body;
  // create a new chat
  const newChat = new Chat({
    // save the sender and receiver ids in an array
    users: [senderId, receiverId],
  });

  try {
    // save the chat
    const savedChat = await newChat.save();
    // send the saved chat with a 200 status code
    res.status(200).json(savedChat);
  } catch (err) {
    // send the error with a 500 status code
    res.status(500).json(err);
  }
}

exports.getChatByUserId = async (req, res) => {
  const {userId} = req.params;
  try {
    // find all chats where the user id is equal to the sender or receiver ID
    const chats = await Chat.find({
      users: {$in: [userId]},
    });
    // send the chats with a 200 status code
    res.status(200).json(chats);
  } catch (err) {
    // send the error with a 500 status code
    res.status(500).json(err);
  }
}

// get the chat between two users
exports.getChatBetweenTwoUsers =  async (req, res) => {
  const {firstUserId, secondUserId} = req.params;
  try {
    // find the chat between the two users
    const chat = await Chat.findOne({
      // find the chat where the users array contains both the first and second user ID
      users: {$all: [firstUserId, secondUserId]},
    });
    // send the chat with a 200 status code
    res.status(200).json(chat);
  } catch (err) {
    // send the error with a 500 status code
    res.status(500).json(err);
  }
}