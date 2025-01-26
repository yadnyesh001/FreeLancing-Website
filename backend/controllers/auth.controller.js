import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  if (!name || !username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }


  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    if(password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      email, 
      password: hashedPassword,
      role,
    }); 

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    const cookieName = process.env.COOKIE_NAME || "jwt-freelancing";

    res.cookie(cookieName, token, {
      httpOnly: true, // to disable accessing token via client side
      maxAge: 3 * 24 * 60 * 60 * 1000, // session cookie will expire after 3 days
      sameSite: 'strict',  // cookie will only be sent in same-site context
      secure: process.env.NODE_ENV === 'production', // cookie will only be sent in https
    });

    res.status(201).json({
      message: "User registered in successfully",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    const cookieName = process.env.COOKIE_NAME || "jwt-freelancing";

    res.cookie(cookieName, token, {
      httpOnly: true, // to disable accessing token via client side
      maxAge: 3 * 24 * 60 * 60 * 1000, // session cookie will expire after 3 days
      sameSite: 'strict',  // cookie will only be sent in same-site context
      secure: process.env.NODE_ENV === 'production', // cookie will only be sent in https
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const cookieName = process.env.COOKIE_NAME || 'jwt-freelancing'; // Use environment variable or default

    // Clear the cookie
    res.clearCookie(cookieName, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // Send response
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Logout Error:', error); // Log error for server-side debugging

    return res.status(500).json({
      success: false,
      message: "An error occurred during logout",
    });
  }
};

export const getMe = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.log("Error in getMe controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

