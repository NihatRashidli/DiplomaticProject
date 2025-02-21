import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

// 🔹 İstifadəçi doğrulama (Protect Middleware)
export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Tokeni decode et
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // İstifadəçini tap və req.user-a əlavə et
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Token validation error:", error);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

// 🔹 Admin icazəsini yoxla
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
