import express from "express";
import { isAuth } from "../middleware/auth.js";
import { handleCreateComment, handleGetCommentCount, handleGetComments } from "../controllers/comment.js";

const commentRouter = express.Router();

commentRouter.get('/get/:id', handleGetComments)
commentRouter.post('/create',isAuth, handleCreateComment)
commentRouter.get('/count/:id', handleGetCommentCount)

export default commentRouter