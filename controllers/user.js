import { getFollowerCount, getFollowers, getFollowingCount, getFollowings } from "../models/Follow.js";
import { findUserWithId } from "../models/User.js";

export const handleGetUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await findUserWithId({ id });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const handleGetUserStats = async(req, res)=>{
  const {id} = req.params;
  try {
    const followers = await getFollowerCount(id)
    const followings = await getFollowingCount(id)
    res.send({followers, followings})
  } catch (error) {
    
  }
}

