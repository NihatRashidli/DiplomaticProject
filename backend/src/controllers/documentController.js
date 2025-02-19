import Document from "../models/documentModel.js";

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id }); // İstifadəçiyə aid sənədlər
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
