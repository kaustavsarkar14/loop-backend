import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import followRouter from "./routes/follow.js";
import { isAuth } from "./middleware/auth.js";
import postRouter from "./routes/post.js";
import likeRouter from "./routes/like.js";
import commentRouter from "./routes/comment.js";
import Razorpay from "razorpay";
import paymentRouter from "./routes/payment.js";

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

// RAZORPAY CONFIG
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/uploadfile", upload.single("picture"), (req, res) => {
  const filename = req.file.filename;
  return res.status(201).json({ filename }); 
});

// ROUTES
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/follow", isAuth, followRouter);
app.use("/post", postRouter);
app.use("/like", likeRouter);
app.use("/comment", commentRouter)
app.use('/payment', paymentRouter)
app.get('/key', (req, res)=>res.status(200).json({key:process.env.RAZORPAY_API_KEY}))

// MONGOOSE SETUP
const PORT = process.env.PORT || 8001;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to mongoDB"))
  .then(() =>
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
  )
  .catch((err) => console.log(err));

export default app