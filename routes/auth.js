import express from "express";
import { handleLogin, handleRegister, handleVerifyEmail } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);
authRouter.get("/verify/:token",handleVerifyEmail )

export default authRouter;
