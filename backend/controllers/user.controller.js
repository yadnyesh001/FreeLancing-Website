import User from '../models/user.model.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
    
  } catch (error) {
    console.log('Error in getProfile: ', error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Ensure user can only update their own profile
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: "Unauthorized to update this profile" 
      });
    }

    // Find user and validate
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Check username uniqueness only if changing it
    if (updateData.username && updateData.username !== user.username) {
      const existingUsername = await User.findOne({ 
        username: updateData.username, 
        _id: { $ne: userId }  // Exclude the current user from the search
      });

      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: "Username already exists. Please choose another one."
        });
      }
    }

    // Update profile
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      updateData, 
      { new: true, runValidators: true }
    );

    res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully", 
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
        skills: updatedUser.skills,
        bio: updatedUser.bio
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map(err => err.message)
          .join(', ')
      });
    }

    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};


export const getFreelancers = async (req, res) => {
  try {
    const users = await User.find({ role: 'freelancer' });
    res.status(200).json(users);

  } catch (error) {
    console.log('Error in getFreelancers: ', error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getClients = async (req, res) => {
  try {
    const users = await User.find({ role: 'client' });
    res.status(200).json(users);

  } catch (error) {
    console.log('Error in getClients: ', error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });

  } catch (error) {
    console.log('Error in deleteUser: ', error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}