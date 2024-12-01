import mongoose from "mongoose";
import User from "../models/userModel.js";
import Message from "../models/messageModels.js"; // Renamed to capitalize "Message" for consistency

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,  // Corrected to ObjectId
        ref: User,  // "User" is the model name as a string
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,  // Corrected to ObjectId
        ref: Message,  // "Message" is the model name as a string
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);  // Capitalized model name for consistency

export default Conversation;
