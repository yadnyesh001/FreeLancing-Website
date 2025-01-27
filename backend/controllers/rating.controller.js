

export const submitRating = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { rating, comment } = req.body;
    const contract = await Contract.findById(contractId);

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    if (contract.status !== 'completed') {
      return res.status(400).json({ message: 'Contract is not completed' });
    }

    const ratingExists = await Rating.findOne({ contract: contractId });

    if (ratingExists) {
      return res.status(400).json({ message: 'Rating already submitted' });
    }

    const newRating = new Rating({
      rating,
      comment,
      contract: contractId,
      user: req.user._id,
    });

    await newRating.save();

    res.status(201).json({ message: 'Rating submitted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const listRatings = async (req, res) => {
  try {
    const { userId } = req.params;
    const ratings = await Rating.find({ user: userId }).populate('contract');

    res.status(200).json({ ratings });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

