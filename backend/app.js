import express from "express";
import "dotenv/config";
import cors from "cors";
import "./src/db/dbConnection.js";
import inputRoutes from './src/routes/inputRoutes.js';
import customsRoutes from './src/routes/customsRoutes.js';
import productRouter from "./src/routes/productRouter.js";
import userRouter from "./src/routes/userRouter.js";
import cookieParser from "cookie-parser";
import documentRouter from "./src/routes/documentRoutes.js";
import adminRouter from "./src/routes/adminRouter.js";

const port = process.env.PORT || 5001;
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // Cookie'leri göndermek için
  })
);
app.use(cookieParser());

//routes
app.use("/api/inputs", inputRoutes)
app.use("/api/customs", customsRoutes)
app.use("/api/products", productRouter);
app.use("/auth", userRouter);
app.use("/images", express.static("src/images"));
app.use("/documents", documentRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
