import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      occupation,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT));
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      location,
      occupation,
    });
    const userDoc = await newUser.save();
    return res.status(201).json(userDoc);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
};
