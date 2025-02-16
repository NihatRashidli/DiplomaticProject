import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "5m" });
};
