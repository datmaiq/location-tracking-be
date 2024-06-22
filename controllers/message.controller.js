const Message = require("../model/Message.model");

exports.createMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();

    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      chatId: req.params.chatId,
    });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { messageId } = req.params;

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
