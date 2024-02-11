import Follow from "../schema/Follow.js";

export const followUser = ({ followerUserId, followingUserId }) => {
  return new Promise(async (resolve, reject) => {
    if(!followingUserId) return reject({message:"Following user id not found"})
    try {
      const isFollowing = await Follow.findOne({
        followingUserId,
        followerUserId,
      });
      if (isFollowing) return reject({ message: "Already following" });
      const followObj = new Follow({
        followingUserId,
        followerUserId,
        creationDateAndTime: Date.now(),
      });
      const followDoc = await followObj.save();
      resolve(followDoc);
    } catch (error) {
      reject(error);
    }
  });
};
export const unFollowUser = ({ followerUserId, followingUserId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followDoc = await Follow.findOneAndDelete({
        followerUserId,
        followingUserId,
      });
      resolve(followDoc);
    } catch (error) {
      reject(error);
    }
  });
};

export const getFollowers = (followingUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followers = await Follow.find({ followingUserId });
      resolve(followers);
    } catch (error) {
      reject(error);
    }
  });
};
export const getFollowings = (followerUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followings = await Follow.find({ followerUserId }).populate("followingUserId");
      resolve(followings);
    } catch (error) {
      reject(error);
    }
  });
};
