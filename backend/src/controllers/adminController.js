import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// 🔹 Bütün istifadəçiləri gətir
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Şifrəsiz user məlumatları
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "İstifadəçiləri gətirmək mümkün olmadı" });
  }
};

// 🔹 Yeni admin əlavə et
export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Əgər user varsa və rolu userdirsə, onu admin et
      if (existingUser.role === "user") {
        existingUser.role = "admin";
        await existingUser.save();
        return res
          .status(200)
          .json({ message: "İstifadəçi artıq admin edildi" });
      }

      return res
        .status(400)
        .json({ message: "Bu email artıq admin kimi qeydiyyatdadır" });
    }

    // Əgər user yoxdursa, yeni admin yarat
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin yaradıldı" });
  } catch (error) {
    res.status(500).json({ message: "Admin əlavə edilərkən xəta baş verdi" });
  }
};

// 🔹 İstifadəçini sil
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }

    // Adminlər adminləri silə bilməsin
    if (userToDelete.role === "admin") {
      return res.status(403).json({ message: "Admin silinə bilməz!" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "İstifadəçi silindi" });
  } catch (error) {
    res.status(500).json({ message: "İstifadəçini silərkən xəta baş verdi" });
  }
};

// 🔹 İstifadəçini redaktə et
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }

    // **🟢 Mövcud admin istifadəçini redaktə etdiyini yoxlayırıq**
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Bu əməliyyatı yalnız admin edə bilər" });
    }

    // **🟢 İstifadəçi məlumatlarını yenilə**
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.status(200).json({ message: "İstifadəçi uğurla yeniləndi", user });
  } catch (error) {
    console.error("User update error:", error);
    res.status(500).json({ message: "İstifadəçini yeniləmək mümkün olmadı" });
  }
};
