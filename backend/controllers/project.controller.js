import Project from '../models/project.model.js';

export const createProject = async (req, res) => {
  try {
    const { title, description, budget, skillsRequired, clientId, status } = req.body;

    if (!title || !description || !budget || !skillsRequired || !clientId) {
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

    if (!Array.isArray(skillsRequired) || skillsRequired.length === 0) {
      return res.status(400).json({ success: false, message: "Skills required must be an array with at least one skill" });
    }

    if (budget <= 0) {
      return res.status(400).json({ success: false, message: "Budget must be a positive number" });
    }

    const newProject = new Project({
      title,
      description,
      budget,
      skillsRequired,
      clientId,
      status: status || "open", 
    });

    const savedProject = await newProject.save();

    res.status(201).json({ 
      success: true, 
      message: "Project created successfully", 
      project: savedProject 
    });

  } catch (error) {
    console.error("Error in createProject:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({ success: true, projects });

  } catch (error) {
    console.error("Error in getProjects:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, project });

  } catch (error) {
    console.error("Error in getProjectById:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id , req.body, { new: true });

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Project updated successfully", 
      project 
    });

  } catch (error) {
    console.log('Error in updateProject: ', error.message);
    res.status(500).json({ message: "Internal server error" });
  } 
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Project deleted successfully" });

  } catch (error) {
    console.error("Error in deleteProject:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};