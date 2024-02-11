import express from "express"
import { create, getAllPosts } from "../controllers/post.js"
const postRouter = express.Router()

postRouter.get('/get', getAllPosts)
postRouter.post('/create', create)

export default postRouter