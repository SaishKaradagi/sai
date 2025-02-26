import mongoose from "mongoose";

const mockInterviewSchema = new mongoose.Schema({
  jsonMockResp: { type: String, required: true },
  jobPosition: { type: String, required: true },
  jobDesc: { type: String, required: true },
  jobExperience: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  mockId: { type: String, required: true }
});

const MockInterview = mongoose.model("MockInterview", mockInterviewSchema);

export default MockInterview;
