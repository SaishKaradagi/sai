import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    sender: {
      userId: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      displayName: {
        type: String,
        required: true,
      },
    },
    content: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "file", "system"],
      default: "text",
    },
    fileUrl: String,
    fileName: String,
    fileSize: Number,
    fileType: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
