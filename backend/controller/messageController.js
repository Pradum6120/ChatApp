import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModels.js";
import User from "../models/userModel.js";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    let { id } = req.params; // Receiver's ID
    const senderId = req.user; // Sender's ID (currentUser)
    id = id.trim();
    // Fixing the query for finding an existing conversation
    let conversation = await Conversation.findOne({
      $and: [
        { members: { $in: [senderId] } },
        { members: { $in: [id] } },
      ],
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = new Conversation({
        members: [senderId, id],
      });
      await conversation.save(); // Save the new conversation
    }

    // Create the new message
    const newMessage = new Message({
      senderId,
      receiverId: id, // Assuming 'receiverId' should be used
      message,
    });

    // Push the message reference to the conversation's messages array
    conversation.messages.push(newMessage._id);

    // Save the message and conversation
    await Promise.all([newMessage.save(), conversation.save()]);

    // Send the response with the new message
    return res.status(201).json({
      newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    
    // current user
    const currentUser = req.user;

    if (!id || !currentUser) {
      return res.status(400).json({
        message: "User or conversation ID not found",
      });
    }

    const conversation = await Conversation.findOne({
      members: {
        $all: [id, currentUser],
      },
    }).populate("messages")
    .populate("members");

    if (!conversation) {
      return res.status(200).json({
        message: "No conversation found",
      });
    }

    return res.status(200).json({
      conversation,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export { sendMessage, getMessage };
