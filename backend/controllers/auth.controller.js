import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if(!name || !email || !password || !role){
      return res.json({ message: 'All fields are required' });
    }

    const existingEmail = await User.findOne({email});
    if(existingEmail){
      return res.status(400).json({ message: 'Email already exists' });
    }

    if(password.length < 6){
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      role,
      email, 
      password: hashedPassword,
    }); 

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    res.cookie("jwt-freelancing", token, {
      httpOnly: true, 
      maxAge: 3 * 24 * 60 * 60 * 1000, 
      sameSite: 'strict',  
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.log("Error in signup: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const login = async (req, res) => {
  res.json('login'); 
}

export const logout = async (req, res) => {
  res.json('logout');
}

export const getMe = async (req, res) => {
  res.json('me');
}