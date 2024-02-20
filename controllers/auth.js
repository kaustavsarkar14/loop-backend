import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserWithEmail,
  findUserWithUsername,
  registerUser,
  verifyEmail,
} from "../models/User.js";

// REGISTER USER
export const handleRegister = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      username,
      location,
      picturePath,
      occupation,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT));
    const userDoc = await registerUser({
      name,
      email,
      username,
      password: passwordHash,
      picturePath,
      location,
      occupation,
    });
    return res.status(201).json(userDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// LOG IN
export const handleLogin = async (req, res) => {
  try {
    const { loginId, password } = req.body;
    let user;
    user = await findUserWithEmail({ email: loginId });
    if (!user) user = await findUserWithUsername({ username: loginId });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).json({ error: "Wrong password" });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    delete user.password;
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const handleVerifyEmail = async (req, res) => {
  try { 
    const user = await verifyEmail(req.params.token);
    const htmlResponse = "<h1>Email Verified</h1>";
    res.send(htmlResponse);
  }
  catch (error) {
    console.log(error)
    const htmlResponse = "<h1>Error</h1>";
    res.send(htmlResponse)
  }
}
