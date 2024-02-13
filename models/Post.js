import Post from "../schema/Post.js";

export const createPost = ({ title, image, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postObj = new Post({
        title,
        image,
        userId,
        creationDateAndTime: Date.now(),
        isDeleted: false,
      });
      const postDoc = await postObj.save();
      resolve(postDoc);
    } catch (error) {
      reject(error);
    }
  });
};

export const getPosts = ({page}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await Post.find({})
        .sort({ creationDateAndTime: -1 })
        .skip((page-1)*10)
        .limit(10)
        .populate("userId");
      resolve(posts);
    } catch (error) {
      reject(error);
    }
  });
};
export const getPublicPosts = ({page}) => {
  return new Promise(async (resolve, reject) => {
    try {
        const posts = await Post.find({})
        .sort({ creationDateAndTime: -1 })
        .skip((page-1)*10)
        .limit(10)
        .populate("userId");
      resolve(posts);
    } catch (error) {
      reject(error);
    }
  });
};
export const deletePost = ({ postId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletePost = await Post.findOneAndDelete({ _id: postId });
      resolve(deletePost);
    } catch (error) {
      reject(error);
    }
  });
};
export const findPostById = ({ postId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await Post.findOne({ _id: postId });
      resolve(post);
    } catch (error) {
      reject(error);
    }
  });
};
