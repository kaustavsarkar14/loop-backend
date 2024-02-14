import express from "express";
import { handleFollow, handleGetFollowers, handleGetFollowings, handleUnFollow } from "../controllers/follow.js";
const followRouter = express.Router();

followRouter.post("/follow-user", handleFollow);
followRouter.post("/unfollow-user", handleUnFollow);
followRouter.get("/followings", handleGetFollowings);
followRouter.get('/followers', handleGetFollowers)

export default followRouter;
