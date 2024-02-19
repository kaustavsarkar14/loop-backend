import express from "express"
import { checkout, paymentVerification } from "../controllers/payment.js"
const paymentRouter = express.Router()

paymentRouter.post('/checkout', checkout)
paymentRouter.post('/verify/:id', paymentVerification)

export default paymentRouter