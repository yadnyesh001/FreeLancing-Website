import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Freelancer submitting the proposal
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true, // Project to which the proposal is related
    },
    description: {
      type: String,
      required: true, // Freelancer’s pitch or proposal description
    },
    budget: {
      type: Number,
      required: true, // Freelancer’s quoted budget for the project
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Proposal = mongoose.model("Proposal", proposalSchema);
export default Proposal;
