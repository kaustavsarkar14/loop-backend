import express from "express";
import { isAuth } from "../middleware/auth.js";
import { handleGetUser, handleGetUserStats } from "../controllers/user.js";
const userRouter = express.Router();

userRouter.get("/:id", handleGetUser);
userRouter.get("/", isAuth, (req, res) => res.status(200).json(req.user));
userRouter.get('/stats/:id', handleGetUserStats)

export default userRouter;
 