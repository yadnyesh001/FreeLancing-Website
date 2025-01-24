import User from '../models/user.model.js';

export const getProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.log("Error in getProfile controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { name, email, username } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, username },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(updatedUser);

  } catch (error) {
    console.log("Error in updateProfile controller:", error);
    res.status(500).json({ message: "Internal server error" });
  } 
}

export const getProfileById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.log("Error in getProfileById controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}