


export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ job });

  } catch (error) {
    console.log("Error in createJob controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getJobs = async (req, res) => {  
  try {
    const jobs = await Job.find();
    res.status(200).json({ jobs });

  } catch (error) {
    console.log("Error in getJobs controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const jobDetail = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ job });

  } catch (error) {
    console.log("Error in jobDetail controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ job });

  } catch (error) {
    console.log("Error in updateJob controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });

  } catch (error) {
    console.log("Error in deleteJob controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};