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
userRouter.post("/uploadProfilePicture", protect, upload.single("image"), uploadProfilePicture);

export default userRouter;
