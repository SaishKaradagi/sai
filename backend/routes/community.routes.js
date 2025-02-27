import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  joinCommunity,
  leaveCommunity,
  getCommunityMessages,
  uploadFile,
  getUserCommunities,
} from "../controller/communityController.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFileName);
  },
});

// File filter for PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max size
  },
  fileFilter: fileFilter,
});

// Middleware to mock authentication (replace with your actual auth)
const mockAuth = (req, res, next) => {
  // In a real app, you would get this from your auth middleware or JWT token
  // For testing, we'll use query parameters or default values
  req.body.user = {
    userId: req.query.userId || req.body.userId || "user123",
    email: req.query.email || req.body.email || "test@example.com",
    displayName: req.query.displayName || req.body.displayName || "Test User",
  };
  next();
};

// Community routes
router.post("/", mockAuth, createCommunity);
router.get("/", getAllCommunities);
router.get("/:id", getCommunityById);
router.post("/:id/join", mockAuth, joinCommunity);
router.post("/:id/leave", mockAuth, leaveCommunity);
router.get("/:id/messages", getCommunityMessages);
router.post("/:id/upload", mockAuth, upload.single("file"), uploadFile);
router.get("/user/:userId", getUserCommunities);

export default router;
