import express from "express";
import { handleLogin, handleRegister } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);

export default authRouter;
