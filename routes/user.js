import express from "express";
import { isAuth } from "../middleware/auth.js";
import { handleEditeProfile, handleGetFollowDetails, handleGetUser, handleGetUserStats, handleSearchUsers } from "../controllers/user.js";
const userRouter = express.Router();

userRouter.get("/:id", handleGetUser);
userRouter.get("/", isAuth, (req, res) => res.status(200).json(req.user));
userRouter.get('/stats/:id', handleGetUserStats)
userRouter.get('/followdetails/:id',isAuth, handleGetFollowDetails)
userRouter.post('/editprofile', isAuth, handleEditeProfile)
userRouter.post('/search', handleSearchUsers)

export default userRouter;
 