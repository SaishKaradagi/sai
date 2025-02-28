import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import MockInterview from "./model/mockInterview.js";
import Message from "./model/message.js"; // Import the new Message model
import { chatSession } from "./geminiHelp/genemini.js";
import { analyzeResume } from "./geminiHelp/resumeAnalyzer.js";
import { chatSessionInterview } from "./geminiHelp/aiInterview.js";
import { v4 as uuidv4 } from "uuid";
import interviewDetailRouter from "./routes/interviewDet.routes.js";
import communityRouter from "./routes/community.routes.js"; // Import the new community router
import mentorRouter from "./routes/mentor.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// Create HTTP server and socket.io instance
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Ensure frontend can access the backend
app.use(express.json());

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Register API Routes (ENSURE `/api/communities` IS FIRST)
app.use("/api/communities", communityRouter); // ✅ Fix: Ensure this is registered early
app.use("/", interviewDetailRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("Hello");
});

// Debug: Log available API routes
console.log("✅ Available API Routes:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`${r.route.stack[0].method.toUpperCase()} ${r.route.path}`);
  }
});

// Roadmap Generation Route
app.use("/roadmap", async (req, res) => {
  try {
    console.log(req.query, " req.query");
    const { field, months } = req.query;
    if (!field || !months) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const inputPrompt = `Generate a structured JSON roadmap for becoming a ${field} in ${months} months.
The JSON response should follow exactly this structure (keeping these exact property names):
{
  "roadmapTitle": "Career Roadmap for ${field}",
  "overallTimeFrame": "${months} months",
  "sections": [
    {
      "sectionTitle": "Prerequisites",
      "time": "X months/weeks",
      "topics": ["topic1", "topic2", "topic3"]
    },
    {
      "sectionTitle": "Basic Level",
      "time": "X months/weeks",
      "topics": ["topic1", "topic2", "topic3"]
    },
    {
      "sectionTitle": "Intermediate Level",
      "time": "X months/weeks",
      "topics": ["topic1", "topic2", "topic3"]
    },
    {
      "sectionTitle": "Advanced Level",
      "time": "X months/weeks", 
      "topics": ["topic1", "topic2", "topic3"]
    }
  ]
}

The sum of the time periods across all sections should equal ${months} months.
Provide the response as clean JSON only, no extra text, markdown, or code blocks.`;

    const result = await chatSession.sendMessage(inputPrompt);
    let jsonText = result.response.text();

    if (jsonText.includes("```")) {
      jsonText = jsonText.replace(/```json|```/g, "").trim();
    }

    console.log("Raw response:", jsonText);

    try {
      const parsedData = JSON.parse(jsonText);
      console.log("Parsed data:", parsedData);

      if (
        !parsedData.roadmapTitle ||
        !parsedData.overallTimeFrame ||
        !Array.isArray(parsedData.sections)
      ) {
        throw new Error("Invalid response structure");
      }

      res.status(200).json(parsedData);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      res
        .status(500)
        .json({ error: "Error parsing AI response", rawResponse: jsonText });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Error in fetching data through AI" });
  }
});

// New route for resume analysis
app.post("/api/analyze-resume", async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body;
    if (!resumeText || !targetRole) {
      return res
        .status(400)
        .json({ error: "Resume text and target role are required" });
    }

    console.log("Analyzing resume for role:", targetRole);
    const analysis = await analyzeResume(resumeText, targetRole);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Failed to analyze resume" });
  }
});

// Add interview question
app.use("/interviewQuestion", async (req, res) => {
  try {
    const { jobPosition, jobDesc, jobExprience, userName } = req.query;
    if (!jobPosition || !jobDesc || !jobExprience) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    // console.log(jobPosition, jobDesc, jobExprience, userName)

    const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExprience}, Depends on Information give me 5 Interview Question with Answer in JSON format,  Give question and answer as field in JSON`;
    const result = await chatSessionInterview.sendMessage(inputPrompt);
    const jsonData = result.response
    .text()
    .replace("```json", "")
    .replace("```", "");
    const parsedData = JSON.parse(jsonData);
    console.log(parsedData)

    if(parsedData){
      const newMockInterview = new MockInterview({
        jsonMockResp: jsonData,
        jobPosition:jobPosition,
        jobDesc:jobDesc,
        jobExperience: jobExprience,
        createdBy: userName,
        createdAt: new Date(),
        mockId: uuidv4(),
      });

      
          await newMockInterview.save();
          res.status(200).send([parsedData, newMockInterview.mockId]);
    }

  } catch (error) {
    res.status(500).send({ error: "Error in fetching data through AI" });
  }
});

// Interview feedback and rating
app.use("/getRatingFeedback", async (req, res) => {
  try {
    const { question, userAnswer } = req.query;

    if (!question || !userAnswer) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    // const inputPrompt = `Generate a structured JSON roadmap for becoming a ${field} in ${months} months. The JSON should have four main sections: prerequisites, basic, intermediate, and advanced. Each section should include "topics" as a list of key concepts and "time" as the estimated time to complete them. Adjust the time for each section based on the goal of completing the roadmap in ${months} months. The output should be formatted as clean and structured JSON, without additional explanations or resources.`
    const feedbackPrompt =
      "Question:" +
      question +
      "UserAnswer:" +
      userAnswer +
      "Depends on question and user answer for given interview question" +
      "Please give us Rating and Feedback as area of imporvement if any" +
      "in just 3 to 5 lines to improve it is in JSON formate with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const jsonData = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(jsonData, "rating and feedback");
    res.status(200).send(JSON.parse(jsonData));
  } catch (error) {
    res.status(500).send({ error: "Error in giving rating and feedback" });
  }
});

app.use("/api/mentors", mentorRouter);

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join-community", (communityId) => {
    socket.join(communityId);
    console.log(`Socket ${socket.id} joined community: ${communityId}`);
  });

  socket.on("send-message", async (messageData) => {
    try {
      const { communityId, userId, email, displayName, content } = messageData;
      const newMessage = new Message({
        communityId,
        sender: { userId, email, displayName },
        content,
        messageType: "text",
      });

      await newMessage.save();
      io.to(communityId).emit("new-message", newMessage);
    } catch (error) {
      console.error("Error handling message:", error);
      socket.emit("error", { message: "Error sending message" });
    }
  });

  socket.on("file-uploaded", (fileData) => {
    io.to(fileData.communityId).emit("new-file", fileData);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
