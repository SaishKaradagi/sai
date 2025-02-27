import Community from "../model/community.js";
import Message from "../model/message.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new community
export const createCommunity = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const { userId, email, displayName } = req.body.user;

    if (!name || !description || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingCommunity = await Community.findOne({ name });
    if (existingCommunity) {
      return res.status(400).json({ error: "Community name already exists" });
    }

    const newCommunity = new Community({
      name,
      description,
      category,
      createdBy: {
        userId,
        email,
        displayName,
      },
      members: [
        {
          userId,
          email,
          displayName,
          role: "admin",
          joinedAt: new Date(),
        },
      ],
    });

    await newCommunity.save();

    // Create welcome message
    const welcomeMessage = new Message({
      communityId: newCommunity._id,
      sender: {
        userId: "system",
        email: "system@careerai.com",
        displayName: "CareerAI",
      },
      content: `Welcome to the ${name} community! This is the beginning of your career journey together.`,
      messageType: "system",
    });

    await welcomeMessage.save();

    res.status(201).json(newCommunity);
  } catch (error) {
    console.error("Error creating community:", error);
    res.status(500).json({ error: "Error creating community" });
  }
};

// Get all communities
export const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find().select(
      "name description category imageUrl members createdAt"
    );
    res.status(200).json(communities);
  } catch (error) {
    console.error("Error fetching communities:", error);
    res.status(500).json({ error: "Error fetching communities" });
  }
};

// Get community by ID
export const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    res.status(200).json(community);
  } catch (error) {
    console.error("Error fetching community:", error);
    res.status(500).json({ error: "Error fetching community" });
  }
};

// Join a community
export const joinCommunity = async (req, res) => {
  try {
    const { userId, email, displayName } = req.body.user;
    const communityId = req.params.id;

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    // Check if user is already a member
    const isMember = community.members.some(
      (member) => member.userId === userId
    );
    if (isMember) {
      return res
        .status(400)
        .json({ error: "Already a member of this community" });
    }

    community.members.push({
      userId,
      email,
      displayName,
      role: "member",
      joinedAt: new Date(),
    });

    await community.save();

    // Create welcome message for new member
    const joinMessage = new Message({
      communityId: community._id,
      sender: {
        userId: "system",
        email: "system@careerai.com",
        displayName: "CareerAI",
      },
      content: `${displayName} has joined the community! Welcome!`,
      messageType: "system",
    });

    await joinMessage.save();

    res.status(200).json({ message: "Successfully joined community" });
  } catch (error) {
    console.error("Error joining community:", error);
    res.status(500).json({ error: "Error joining community" });
  }
};

// Leave a community
export const leaveCommunity = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const communityId = req.params.id;

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    // Find the member
    const memberIndex = community.members.findIndex(
      (member) => member.userId === userId
    );
    if (memberIndex === -1) {
      return res.status(400).json({ error: "Not a member of this community" });
    }

    // Check if the user is the last admin
    const isAdmin = community.members[memberIndex].role === "admin";
    const adminCount = community.members.filter(
      (member) => member.role === "admin"
    ).length;

    if (isAdmin && adminCount === 1) {
      return res.status(400).json({
        error:
          "You are the only admin. Please assign another admin before leaving",
      });
    }

    // Remove the member
    const removedMember = community.members.splice(memberIndex, 1)[0];
    await community.save();

    // Create leave message
    const leaveMessage = new Message({
      communityId: community._id,
      sender: {
        userId: "system",
        email: "system@careerai.com",
        displayName: "CareerAI",
      },
      content: `${removedMember.displayName} has left the community.`,
      messageType: "system",
    });

    await leaveMessage.save();

    res.status(200).json({ message: "Successfully left community" });
  } catch (error) {
    console.error("Error leaving community:", error);
    res.status(500).json({ error: "Error leaving community" });
  }
};

// Get all messages for a community
export const getCommunityMessages = async (req, res) => {
  try {
    const communityId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const messages = await Message.find({ communityId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Return messages in reversed order (oldest first) for chat display
    res.status(200).json(messages.reverse());
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
};

// Upload a file to a community
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { userId, email, displayName } = req.body.user;
    const communityId = req.params.id;
    const file = req.file;

    // Create message with file info
    const fileMessage = new Message({
      communityId,
      sender: {
        userId,
        email,
        displayName,
      },
      content: req.body.message || `Shared a file: ${file.originalname}`,
      messageType: "file",
      fileUrl: `/uploads/${file.filename}`,
      fileName: file.originalname,
      fileSize: file.size,
      fileType: file.mimetype,
    });

    await fileMessage.save();

    res.status(201).json(fileMessage);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Error uploading file" });
  }
};

// Get communities the user is a member of
export const getUserCommunities = async (req, res) => {
  try {
    const { userId } = req.params;
    const communities = await Community.find({ "members.userId": userId });
    res.status(200).json(communities);
  } catch (error) {
    console.error("Error fetching user communities:", error);
    res.status(500).json({ error: "Error fetching user communities" });
  }
};
