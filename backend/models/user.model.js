import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['freelancer', 'client', 'admin'],
    default: 'freelancer',
  },
  bio: {
    type: String,
    default: '',
  },
  skills: {
    type: [String], 
    default: [],
  },
  profilePicture: {
    type: String, 
    default: '',
  },
  active: {
    type: Boolean,
    default: true, 
  }
},{
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;