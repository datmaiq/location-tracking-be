// message.controller.js
const Message = require("../model/Message.model");

exports.createMessage = async (req, res) => {
  // create a new message
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();

    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all the messages of a chat based on the chat id
exports.getMessages = async (req, res) => {
  try {
    // find all the messages where the chat id is equal to the chat id passed in the params
    const messages = await Message.find({
      chatId: req.params.chatId,
    });

    // send the messages with a 200 status code
    res.status(200).json(messages);
  } catch (err) {
    // send the error with a 500 status code
    res.status(500).json(err);
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { messageId } = req.params;

    // Find the message to ensure it exists and the user is authorized to delete it
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
        data: null,
      });
    }

    if (
      message.sender.toString() !== userId &&
      message.receiver.toString() !== userId
    ) {
      return res.status(403).json({
        message: "You are not authorized to delete this message",
        data: null,
      });
    }

    // Delete the message
    await Message.findByIdAndDelete(messageId);

    res.status(200).json({
      message: "Message deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
