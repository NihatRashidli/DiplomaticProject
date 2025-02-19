import express from "express";
import { protect } from "../middleware/auth/authMiddleware.js";
import Document from "../models/documentModel.js";
import upload from "../upload/upload.js";

const router = express.Router();

// 🟢 GET /documents - İstifadəçinin sənədlərini gətir
router.get("/", protect, async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Failed to fetch documents" });
  }
});

// 🟢 POST /documents - Yeni sənəd əlavə et
router.post("/", protect, upload.single("file"), async (req, res) => {
  try {

    const imageUrl = req.file
      ? `images/${req.file.filename}`.replace(/\\/g, "/")
      : "images/default.png";

      
    if (!req.file) {
      console.error("File upload failed, req.file is undefined!");
      return res.status(400).json({ message: "File is required" });
    }

    console.log("Uploaded File:", req.file);
    console.log("User Info:", req.user);

    const newDocument = new Document({
      name: req.file.originalname,
      url: req.file.path, // 🟢 Faylın yolu (Məsələn: uploads/1711111111-document.pdf)
      user: req.user._id, // 🟢 İstifadəçi ID-si
    });

    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    console.error("Error while saving document:", error);
    res.status(500).json({ message: "Failed to add document" });
  }
});

// 🟢 Serverdə yüklənmiş fayllara giriş imkanı ver
router.use("/uploads", express.static("uploads"));

export default router;
