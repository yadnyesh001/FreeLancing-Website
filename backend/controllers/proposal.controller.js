import Proposal from "../models/proposal.model.js";
import Project from "../models/project.model.js";

export const submitProposal = async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const proposal = new Proposal({
      ...req.body,
      freelancerId: req.user,
    });

    await proposal.save();
    res.status(201).json(proposal);
  } 
  catch (error) {
    console.error("Error in submitProposal:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProposalsByProjectId = async (req, res) => {
  try {
    const { id } = req.params;
    const proposals = await Proposal.find({ projectId: id });
    res.status(200).json(proposals);
  } catch (error) {
    console.error("Error in getProposalsByProjectId:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const acceptOrRejectProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const proposal = await Proposal.findById(id);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    if (status === "accepted") {
      await Project.findByIdAndUpdate(proposal.projectId, { $set: { freelancerId: proposal.freelancerId } });
    }

    proposal.status = status;
    await proposal.save();
    res.status(200).json(proposal);
  } catch (error) {
    console.error("Error in acceptOrRejectProposal:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};