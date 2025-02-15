import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    try {
      // Tokeni al
      token = req.cookies.token;
      console.log("Token from cookie:", token); // Tokeni yoxlamaq üçün əlavə edin

      // Tokeni deşifre et
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded:", decoded); // Deşifre edilmiş tokeni yoxlamaq üçün əlavə edin

      // İstifadəçini tap və req.user-a əlavə et
      req.user = await User.findById(decoded.id).select("-password");
      console.log("User:", req.user); // İstifadəçini yoxlamaq üçün əlavə edin

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
