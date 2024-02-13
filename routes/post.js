import express from "express";
import { handleCreatePost, handleGetAllPosts, handleGetAllPublicPosts, handlePostDelete } from "../controllers/post.js";
import { isAuth } from "../middleware/auth.js";
const postRouter = express.Router();

postRouter.get("/getall", handleGetAllPublicPosts);
postRouter.get("/get", isAuth, handleGetAllPosts);
postRouter.post("/create", isAuth, handleCreatePost);
postRouter.post("/delete", isAuth, handlePostDelete);

export default postRouter;
 