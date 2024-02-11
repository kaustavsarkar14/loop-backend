import { followUser, getFollowers, getFollowings } from "../models/Follow.js";

export const follow = async (req, res) => {
  try {
    const followerUserId = req.user._id;
    const { followingUserId } = req.body;
    const followObj = await followUser({ followerUserId, followingUserId });
    return res.status(201).json({ followObj });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const followings = async (req, res) => {
  try {
    const followerUserId = req.user._id;
    const followings = await getFollowings(followerUserId);
    return res.status(200).json(followings);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
export const followers = async (req, res) => {
  try {
    const followingUserId = req.user._id;
    const followers = await getFollowers(followingUserId);
    return res.status(200).json(followers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
