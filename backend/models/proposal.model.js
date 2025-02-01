import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  proposalText: {
    type: String,
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
}, {
  timestamps: true,
});

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;