import mongoose from "mongoose";
import User from "../models/userModel.js";

// Define message schema
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,  // Use ObjectId properly
      ref: User ,  // Reference to the User model
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,  // Use ObjectId properly
      ref: User ,  // Reference to the User model
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }  // Adds createdAt and updatedAt fields
);

// Create the model
const Message = mongoose.model("Message", messageSchema);

// Export the model
export default Message;
