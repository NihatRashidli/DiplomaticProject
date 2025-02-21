import express from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
  getUser,
  uploadProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import upload from "../upload/upload.js";
import { protect } from "../middleware/auth/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), register);
userRouter.get("/verify", verifyEmail);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.post("/resetpassword", resetPassword);
userRouter.get("/user", protect, getUser);
userRouter.post(
  "/uploadProfilePicture",
  protect,
  upload.single("image"),
  uploadProfilePicture
);
userRouter.get("/", protect, async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Failed to fetch documents" });
  }
});
userRouter.post("/update-role", updateUserRole);

export default userRouter;
