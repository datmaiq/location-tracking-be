// message.controller.js

const Message = require("../model/Message.model");
const User = require("../model/User.model");

exports.sendMessage = async (req, res) => {
  try {
    const { _id: senderId } = req.user;
    const { receiverId, content } = req.body;

    // Find the receiver to ensure they exist
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        message: "Receiver not found",
        data: null,
      });
    }

    // Create and save the new message
    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    await message.save();

    res.status(200).json({
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { friendId } = req.params;

    // Find all messages between the user and the friend
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      message: "Messages retrieved successfully",
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
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
