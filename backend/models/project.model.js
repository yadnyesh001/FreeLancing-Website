import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // The client who posted the project
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "completed", "closed"],
      default: "open",
    },
    skillsRequired: {
      type: [String], // List of skills required for the project
      default: [],
    },
    proposals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proposal",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
