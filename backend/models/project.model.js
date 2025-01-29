import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
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
  skillsRequired: {
    type: [String],
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["open", "in-progress", "completed", "canceled"],
    required: true,
    default: "open",
    trim: true
  },
  proposals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
    },
  ],
}, {
  timestamps: true,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;