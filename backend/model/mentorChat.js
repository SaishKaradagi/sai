import mongoose from "mongoose";

const mentorChatSchema = new mongoose.Schema(
  {
    mentorId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    messages: [
      {
        sender: {
          type: String,
          enum: ["user", "mentor"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const MentorChat = mongoose.model("MentorChat", mentorChatSchema);
export default MentorChat;
