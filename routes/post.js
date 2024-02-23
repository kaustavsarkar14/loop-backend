import express from "express";
import { handleCreatePost, handleEditPost, handleGetAllPosts, handleGetAllPublicPosts, handleGetPostById, handleGetReposts, handleGetUserPosts, handlePostDelete, handleUndoRepost } from "../controllers/post.js";
import { isAuth } from "../middleware/auth.js";
const postRouter = express.Router();

postRouter.get("/getall", handleGetAllPublicPosts);
postRouter.get("/get/:id", handleGetUserPosts);
postRouter.get("/getpost/:id", handleGetPostById);
postRouter.get("/get", isAuth, handleGetAllPosts);
postRouter.post("/create", isAuth, handleCreatePost);
postRouter.post("/delete", isAuth, handlePostDelete);
postRouter.post("/undorepost", isAuth, handleUndoRepost);
postRouter.post("/reposts", handleGetReposts);
postRouter.post("/edit", handleEditPost)

export default postRouter;
 