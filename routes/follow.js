import express from "express";
import { handleFollow, handleGetFollowers, handleGetFollowings } from "../controllers/follow.js";
const followRouter = express.Router();

followRouter.post("/follow-user", handleFollow);
followRouter.get("/followings", handleGetFollowings);
followRouter.get('/followers', handleGetFollowers)

export default followRouter;
