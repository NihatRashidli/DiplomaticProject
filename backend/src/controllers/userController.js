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

    // Şəkil varsa, imageUrl yaradılır, yoxdursa default şəkil təyin edilir
    const imageUrl = req.file
      ? `images/${req.file.filename}`.replace(/\\/g, "/")
      : "images/default.png";

    // Validation yoxlaması
    const { error } = RegisterValidationSchema.validate({
      name,
      surname,
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Eyni email ilə istifadəçi olub-olmadığını yoxla
    const existUser = await user.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Şifrənin hash edilməsi
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni user yaradılır (username yoxdur)
    const newUser = new user({
      image: imageUrl,
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Token yaradılır
    generateToken(newUser._id, res);

    // Email təsdiq linki göndərilir
    const confirmLink = `${process.env.SERVER_LINK}/auth/verify`;

    recieveMail(newUser, confirmLink);

    return res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const updatedVerify = await user.findByIdAndUpdate(
      { _id: decoded.id },
      { isVerified: true }
    );

    if (updatedVerify) {
      return res.redirect(`${process.env.CLIENT_LINK}/login`);
    }
  } catch (error) {
    return res.status(400).json({ message: "Token not valid or expaired in" });
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
        email: existUser.email,
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

    if (!existUser) return res.status(404).json({ message: "User not found" });

    generateToken(existUser._id, res, "resetToken");

    const resetLink = `${process.env.CLIENT_LINK}/resetpassword`;

    recieveMail(existUser, resetLink);

    return res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  console.log();
  console.log(req.body);

  try {
    const { password } = req.body;

    const { error } = ResetValidationSchema.validate({
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const resetToken = req.cookies.resetToken;

    if (!resetToken) {
      return res
        .status(400)
        .json({ message: "No token found, request new one" });
    }

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

    const existUser = await user.findById(decoded.id);

    if (!existUser) {
      return res.status(400).json({ message: "Token not valid or expaired" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    existUser.password = hashedPassword;

    await existUser.save();

    res.clearCookie("resetToken");

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
};
