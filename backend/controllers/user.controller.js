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

    // Use method to update profile
    const updatedUser = await user.updateProfile(updateData);

    res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully", 
      user: {
        // Exclude sensitive fields
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
        skills: updatedUser.skills,
        bio: updatedUser.bio
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);

    // Handle specific Mongoose validation errors
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