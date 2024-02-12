import express from "express";
import { isAuth } from "../middleware/auth.js";
import { getUser } from "../controllers/user.js";
const userRouter = express.Router();

userRouter.get("/:id", isAuth, getUser);
userRouter.get("/", isAuth, (req, res) => res.status(200).json(req.user));

export default userRouter;
 