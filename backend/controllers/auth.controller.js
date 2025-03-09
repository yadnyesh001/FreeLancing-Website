import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    // Log the request body for debugging
    
    const { username, email, password, role } = req.body;
    
    // Log the destructured values
    
    // More explicit check for each field
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    
    if (!role) {
      return res.status(400).json({ message: 'Role is required' });
    }

    const bothExistingEmailAndUsername = await User.findOne({
      $and: [{ email }, { username }]
    });

    if (bothExistingEmailAndUsername) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    // Check if email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if username exists (since it's now unique)
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      role,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    res.cookie("jwt-freelancing", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.error("Error in signup: ", error.message);
    console.error("Full error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    // Log the request body for debugging
    console.log("Login request body:", req.body);

    const { email, username, password } = req.body;
    
    // Check if either email or username is provided
    const loginIdentifier = email || username;
    
    if (!loginIdentifier || !password) {
      return res.status(400).json({ message: "Email/username and password are required" });
    }

    // Check if the input is an email or username
    // Simple email validation using regex
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginIdentifier);
    
    // Find user by email or username
    let user;
    if (isEmail) {
      user = await User.findOne({ email: loginIdentifier });
    } else {
      user = await User.findOne({ username: loginIdentifier });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    res.cookie("jwt-freelancing", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    });

  } catch (error) {
    console.error("Error in login: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('jwt-freelancing');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error("Error in logout: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};