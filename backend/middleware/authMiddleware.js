import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(token, "secret-key");

    // token was created with payload { user: userObject }
    req.user = decoded.user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireHost = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== "host") {
    return res.status(403).json({ message: "Access restricted to hosts only" });
  }
  next();
};
