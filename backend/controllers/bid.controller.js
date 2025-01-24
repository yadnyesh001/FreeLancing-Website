

export const placeBid = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { amount, deliveryTime } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const bid = new Bid({
      amount,
      deliveryTime,
      job: jobId,
      freelancer: req.user._id,
    });

    await bid.save();

    res.status(201).json({ bid });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBids = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const bids = await Bid.find({ job: jobId });

    res.status(200).json({ bids });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

export const bidDetails = async (req, res) => {
  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    res.status(200).json({ bid });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    if (bid.freelancer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this bid' });
    }

    await bid.remove();

    res.status(200).json({ message: 'Bid deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

