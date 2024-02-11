import express from "express"
import { isAuth } from "../middleware/auth.js"
import { getUser } from "../controllers/user.js"
const userRouter = express.Router()


userRouter.get('/:id',isAuth, getUser)

export default userRouter