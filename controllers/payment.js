import { instance } from "../index.js";
import crypto from "crypto";
import { verifyUser } from "../models/User.js";
import { CLIENT_BASE_URL } from "../utils/CONSTANTS.js";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({ success: true, order });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
  if (expected === razorpay_signature) {
    const updatedUser = await verifyUser(req.params.id);
    return res.redirect(CLIENT_BASE_URL+"/paymentsuccess");
  }
  return res.status(400).json({ success: "false", message: "payment failed" });
};
