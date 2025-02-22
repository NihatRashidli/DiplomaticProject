import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

export const protect = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("🔹 Token received:", token);

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);

    req.user = await User.findById(decoded.id).select("-password");
    console.log("👤 Found User:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("🚨 Token validation error:", error);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

export const isAdmin = (req, res, next) => {
  console.log(
    "Checking admin access for:",
    req.user?.email,
    "Role:",
    req.user?.role
  );

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only" });
  }
  next();
};
