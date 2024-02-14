import { followUser, getFollowers, getFollowings, unFollowUser } from "../models/Follow.js";

export const handleFollow = async (req, res) => {
  try {
    const followerUserId = req.user._id;
    const { followingUserId } = req.body;
    const followObj = await followUser({ followerUserId, followingUserId });
    return res.status(201).json({ followObj });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const handleUnFollow = async (req, res) => {
  try {
    const followerUserId = req.user._id;
    const { followingUserId } = req.body;
    const followObj = await unFollowUser({ followerUserId, followingUserId });
    return res.status(201).json({ followObj });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const handleGetFollowings = async (req, res) => {
  try {
    const followerUserId = req.user._id;
    const followings = await getFollowings(followerUserId);
    return res.status(200).json(followings);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
export const handleGetFollowers = async (req, res) => {
  try {
    const followingUserId = req.user._id;
    const followers = await getFollowers(followingUserId);
    return res.status(200).json(followers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
