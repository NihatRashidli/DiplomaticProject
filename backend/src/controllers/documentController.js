import fs from "fs";
import path from "path";
import Document from "../models/documentModel.js";

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents" });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    const { name, url } = req.body;

    const newDocument = new Document({
      name,
      url,
      user: req.user._id,
    });

    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: "Error uploading document" });
  }
};

// 🔹 Sənəd silmək üçün yeni funksiya
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Faylı serverdən silmək
    const filePath = path.join("uploads", document.name);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // MongoDB-dən sənədi silmək
    await Document.findByIdAndDelete(req.params.id);

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting document" });
  }
};
