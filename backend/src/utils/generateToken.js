import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const generateToken = (id, res) => {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "5m" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // 🍪 Cookie-nin düzgün göndərilməsi üçün vacibdir
    maxAge: 5 * 60 * 1000,
  });

  return token;
};
