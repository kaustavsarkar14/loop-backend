import express from "express"
import { isAuth } from "../middleware/auth.js"
import { getUser } from "../controllers/user.js"
const userRoute = express.Router()


userRoute.get('/:id',isAuth, getUser)

export default userRoute