import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Adjust the path as necessary

const authenticate = async (req, res, next) => {
  const token = req.cookies["jwt-freelancing"];
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: "No authentication token, authorization denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch the user from the database and attach it to req.user
    const user = await User.findById(verified.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(401).json({ message: "User not found, authorization denied" });
    }

    req.user = user; // Store full user object

    next();
  } catch (error) {
    console.log("Error in authenticate middleware:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authenticate;
