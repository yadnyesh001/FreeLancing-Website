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
    const user = await User.findByIdAndUpdate(req.params.id , req.body, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully", 
      user 
    });

  } catch (error) {
    console.log('Error in updateProfile: ', error.message);
    res.status(500).json({ message: "Internal server error" });
  } 
}

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