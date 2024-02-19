import {
  getFollowDoc,
  getFollowerCount,
  getFollowers,
  getFollowingCount,
  getFollowings,
} from "../models/Follow.js";
import {
  editProfile,
  findUserWithId,
  getNewUsers,
  searchUsers,
} from "../models/User.js";
import { sendMail } from "../utils/sendMail.js";

export const handleGetUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await findUserWithId({ id });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const handleGetUserStats = async (req, res) => {
  const { id } = req.params;
  try {
    const followers = await getFollowerCount(id);
    const followings = await getFollowingCount(id);
    res.send({ followers, followings });
  } catch (error) {}
};
export const handleGetFollowDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const isFollowing = await getFollowDoc({
      followerUserId: id,
      followingUserId: req.user._id,
    });
    const isFollower = await getFollowDoc({
      followingUserId: id,
      followerUserId: req.user._id,
    });
    return res.status(200).json({ isFollowing, isFollower });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const handleEditeProfile = async (req, res) => {
  try {
    const {
      newName,
      newEmail,
      newUsername,
      newBio,
      newLocation,
      newPicturepath,
      newBannerpath,
      newOccupation,
    } = req.body;
    const id = req.user._id;
    const updatedUser = await editProfile({
      id,
      newName,
      newEmail,
      newUsername,
      newBio,
      newLocation,
      newPicturepath,
      newBannerpath,
      newOccupation,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const handleSearchUsers = async (req, res) => {
  const searchQuery = req.body.search;
  try {
    const users = await searchUsers({ query: searchQuery });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
export const handleGetNewUsers = async (req, res) => {
  const count = req.body.count || 5;
  try {
    const users = await getNewUsers(count);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const handleSendVerificationMail = async (req, res) => {
  const verifyToken = req.body.token;
  try {
    sendMail({ email: req.user.email, verifyToken });
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
