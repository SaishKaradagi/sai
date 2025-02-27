import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import {
  getChatSession,
  sendMessage,
  getMentors,
} from "../controller/mentorController.js";

const router = express.Router();

router.use(ClerkExpressRequireAuth());

// Mentor routes
router.get("/", getMentors);
router.get("/:mentorId", getChatSession);
router.post("/:mentorId/messages", sendMessage);

export default router;
