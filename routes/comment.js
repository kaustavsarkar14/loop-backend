import express from "express";
import { isAuth } from "../middleware/auth.js";
import { handleCreateComment, handleGetComments } from "../controllers/comment.js";

const commentRouter = express.Router();

commentRouter.get('/get/:id', handleGetComments)
commentRouter.post('/create',isAuth, handleCreateComment)

export default commentRouter