import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerUser } from "../models/User.js";

// REGISTER USER
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      username, 
      location,
      occupation,
    } = req.body;
    const picturePath = req.file.filename
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT));
    const userDoc = await registerUser({
      firstName,
      lastName,
      email,
      username, 
      password: passwordHash,
      picturePath,
      location,
      occupation, 
    });
    return res.status(201).json(userDoc);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// LOG IN
export const login = async (req, res) => {
  try {
    // const {email, password}
  } catch (error) {}
};
