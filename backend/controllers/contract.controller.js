


export const acceptAndCreateContract = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.status !== 'open') {
      return res.status(400).json({ message: 'Job is not open for bidding' });
    }

    const bid = await Bid.findOne({ job: jobId, freelancer: req.user.id });

    if (!bid) {
      return res.status(400).json({ message: 'You have not placed a bid on this job' });
    } else if (bid.status !== 'accepted') {
      return res.status(400).json({ message: 'Your bid has not been accepted' });
    } else if (bid.status === 'accepted') {
      const contract = await Contract.create({
        job: jobId,
        freelancer: req.user.id,
        client: job.client,
        budget: bid.budget,
      });

      await Job.findByIdAndUpdate(jobId, { status: 'closed' });

      return res.status(201).json({ data: contract });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({ $or: [{ client: req.user.id }, { freelancer: req.user.id }] });

    res.status(200).json({ data: contracts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateContract = async (req, res) => {
  try {
    const { contractId } = req.params;
    const contract = await Contract.findById(contractId);

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    if (contract.client.toString() !== req.user.id && contract.freelancer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this contract' });
    }

    const updatedContract = await Contract.findByIdAndUpdate(contractId, req.body, { new: true });

    res.status(200).json({ data: updatedContract });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteContract = async (req, res) => {
  try {
    const { contractId } = req.params;
    const contract = await Contract.findById(contractId);

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    if (contract.client.toString() !== req.user.id && contract.freelancer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this contract' });
    }

    await Contract.findByIdAndDelete(contractId);

    res.status(204).json({ message: 'Contract deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}