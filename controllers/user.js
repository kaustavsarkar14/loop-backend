import { findUserWithId } from "../models/User.js";

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await findUserWithId({ id });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

