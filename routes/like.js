import express from "express";
import { handleFetchLikes, handleLike, handleUnLike } from "../controllers/like.js";
import { isAuth } from "../middleware/auth.js";
const likeRouter = express.Router();

likeRouter.post('/like',isAuth, handleLike)
likeRouter.post('/unlike',isAuth, handleUnLike)
likeRouter.post('/getlikes', handleFetchLikes)

export default likeRouter