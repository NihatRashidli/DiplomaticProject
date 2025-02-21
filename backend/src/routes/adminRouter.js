import express from "express";
import {
  createAdmin,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/adminController.js";
import { isAdmin, protect } from "../middleware/auth/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.get("/users", protect, isAdmin, getUsers);
adminRouter.post("/users", protect, isAdmin, createAdmin);
adminRouter.put("/users/:id", protect, isAdmin, updateUser);
adminRouter.delete("/users/:id", protect, isAdmin, deleteUser);

export default adminRouter;
