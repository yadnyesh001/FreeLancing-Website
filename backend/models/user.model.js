import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true, 
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['client', 'freelancer', 'admin'], 
    default: 'freelancer', 
  },
  profileImage: {
    type: String,
    default: '', 
  },
  skills: {
    type: [String], 
    default: [], 
  },
  bio: {
    type: String,
    default: '', 
  },
  rating: {
    type: Number,
    default: 0, 
    min: 0, 
    max: 5, 
  },
  totalEarnings: {
    type: Number,
  },
}, { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;