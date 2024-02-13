import express from "express";
import { create, getAllPosts, getAllPublicPosts, handlePostDelete } from "../controllers/post.js";
import { isAuth } from "../middleware/auth.js";
const postRouter = express.Router();

postRouter.get("/getall", getAllPublicPosts);
postRouter.get("/get", isAuth, getAllPosts);
postRouter.post("/create", isAuth, create);
postRouter.post("/delete", isAuth, handlePostDelete);

export default postRouter;
 