import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true }, // 🟢 Faylın yolu
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🟢 İstifadəçi ID-si
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;
