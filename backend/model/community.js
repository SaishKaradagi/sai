import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Tech", "Finance", "Marketing", "Design", "Other"],
    },
    imageUrl: {
      type: String,
      default: "/api/placeholder/400/320", // Default placeholder image
    },
    members: [
      {
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
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        role: {
          type: String,
          enum: ["member", "moderator", "admin"],
          default: "member",
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      userId: String,
      email: String,
      displayName: String,
    },
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

export default Community;
