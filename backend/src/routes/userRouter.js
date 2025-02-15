import express from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
  getUser,
} from "../controllers/userController.js";
import upload from "../upload/upload.js";
import { protect } from "../middleware/auth/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), register);
userRouter.get("/verify", verifyEmail);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.get("/resetpassword", resetPassword);
userRouter.get("/user", protect, getUser);

export default userRouter;
