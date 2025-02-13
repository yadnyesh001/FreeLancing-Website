import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.header("jwt-freelancing");
  if (!token) {
    return res.status(401).json({ message: "No authentication token, authorization denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token, authorization denied" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired, please log in again" });
    } else {
      console.log("Error in authenticate:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default authenticate;
