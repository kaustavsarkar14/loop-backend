import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserWithEmail,
  findUserWithUsername,
  registerUser,
} from "../models/User.js";

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
    const picturePath = req.file.filename;
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
    const { loginId, password } = req.body;
    let user;
    user = await findUserWithEmail({ email: loginId });
    user = await findUserWithUsername({ username: loginId });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).json({ error: "Wrong password" });
    const token = jwt.sign({id:user._id}, process.env.SECRET_KEY)
    delete user.password
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({error})
  } 
};
