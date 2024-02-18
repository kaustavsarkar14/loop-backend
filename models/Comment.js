import Comment from "../schema/Comment.js";
import User from "../schema/User.js";

export const createComment = ({ userId, parentId, comment }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const commentObj = new Comment({ userId, parentId, comment, creationDateAndTime: Date.now() });
      const user = await User.findOne({ _id: userId });
      const commentDb = await commentObj.save();
      resolve({ ...commentDb.toObject(), userId: user });
    } catch (error) {
      reject(error);
    }
  });
};

export const getComments = ({ parentId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comments = await Comment.find({ parentId }).sort({ creationDateAndTime: -1 }).populate("userId");
      resolve(comments);
    } catch (error) {
      reject(error);
    }
  });
};

export const getCommentCount = ({ parentId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const commentCount = await Comment.countDocuments({ parentId });
      resolve(commentCount);
    }
    catch (error) {
      reject(error);
    }
  })
}
