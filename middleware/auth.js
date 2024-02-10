import { findUserWithId } from "../models/User.js";
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ error: "Access denied" });

    const { id } = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    const user = await findUserWithId({ id });

    if (!user) return res.status(401).json({ error: "Unauthorized request" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
