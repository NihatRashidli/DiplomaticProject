import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { recieveMail } from "../middleware/mailer/mailer.js";
import jwt from "jsonwebtoken";
import RegisterValidationSchema from "../middleware/validation/RegisterValidation.js";
import LoginValidationSchema from "../middleware/validation/LoginValidation.js";
import ForgotValidationSchema from "../middleware/validation/ForgotValidation.js";
import ResetValidationSchema from "../middleware/validation/ResetValidation.js";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    const imageUrl = req.file
      ? `images/${req.file.filename}`.replace(/\\/g, "/")
      : "images/default.png";

    const { error } = RegisterValidationSchema.validate({
      name,
      surname,
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existUser = await user.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      image: imageUrl,
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // ✅ Email təsdiqləmə üçün token yaradılır
    const jwtToken = generateToken(newUser._id); // Tokeni cookie-də yox, URL üçün qaytarırıq

    // ✅ Email təsdiqləmə linki
    const confirmLink = `${process.env.CLIENT_LINK}/verify?token=${jwtToken}`;

    recieveMail(newUser, confirmLink);

    return res.status(201).json({
      message: "User created successfully. Please check your email.",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query; // URL-dən tokeni al

    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }

    // ✅ Tokeni yoxla
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ İstifadəçini tap və təsdiqlə
    const updatedVerify = await user.findByIdAndUpdate(
      { _id: decoded.id },
      { isVerified: true },
      { new: true }
    );

    if (!updatedVerify) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.redirect(`${process.env.CLIENT_LINK}/login`);
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const login = async (req, res) => {
  try {
    // Gelen JSON datanı yoxla (req.body boş gəlirsə, error qaytar)
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const { email, password } = req.body;
    // Validation yoxlanışı
    const { error } = LoginValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // İstifadəçinin bazada olub-olmadığını yoxla
    const existUser = await user.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Şifrənin doğruluğunu yoxla
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email or password is wrong" });
    }

    // Token yaradıb, cookie-yə yaz
    generateToken(existUser._id, res);
    console.log(existUser.token);

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: existUser._id,
        name: existUser.name,
        surname: existUser.surname,
        email: existUser.email,
        isVerified: existUser.isVerified,
        token: generateToken(existUser._id, res),
      },
    });
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = ForgotValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    
    const existUser = await user.findOne({ email });
    
    const token = generateToken(existUser._id, res, "resetToken");
    if (!existUser) return res.status(404).json({ message: "User not found" }); 

    const resetLink = `${process.env.CLIENT_LINK}/resetpassword?token=${token}`;

    recieveMail(existUser, resetLink);

    return res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    console.log(token);
    if (!token) {
      return res.status(400).json({ message: "No token found, request a new one" });
    }

    const { error } = ResetValidationSchema.validate({ password });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const existUser = await user.findById(decoded.id);

    if (!existUser) {
      return res.status(400).json({ message: "Token not valid or expired" });
    }

    existUser.password = await bcrypt.hash(password, 10);
    await existUser.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
};


