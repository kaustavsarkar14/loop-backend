import express from "express";
import { follow, followings } from "../controllers/follow.js";
const followRouter = express.Router();

followRouter.post("/follow-user", follow);
followRouter.get("/followings", followings);
// followRouter.get('/followers', follow)

export default followRouter;
