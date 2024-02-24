import Post from "../schema/Post.js";

export const createPost = ({
  title,
  image,
  userId,
  isRepost,
  reposterId,
  originalPostId,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postObj = new Post({
        title,
        image,
        userId,
        creationDateAndTime: Date.now(),
        isDeleted: false,
        isRepost,
        reposterId,
        originalPostId,
      });
      const postDoc = await postObj.save();
      resolve(postDoc);
    } catch (error) {
      reject(error);
    }
  });
};

export const getPosts = ({ page, userId, followingUserIds }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await Post.aggregate([
        {
          $addFields: {
            isFollowingPost: {
              $or: [
                { $in: ["$userId", followingUserIds] },
                { $in: ["$reposterId", followingUserIds] }
              ]
            }
          }
        },
        {
          $sort: {
            isFollowingPost: -1,
            creationDateAndTime: -1
          }
        },
        {
          $skip: (page - 1) * 10
        },
        {
          $limit: 10
        }
      ]);
      await Post.populate(posts, [{ path: 'userId' }, { path: 'reposterId' }]);
      resolve(posts);
    } catch (error) {
      reject(error);
    }
  });
};

export const getPublicPosts = ({ page }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await Post.find({})
        .sort({ creationDateAndTime: -1 })
        .skip((page - 1) * 10)
        .limit(10)
        .populate("userId")
        .populate("reposterId");
      resolve(posts);
    } catch (error) {
      reject(error);
    }
  });
};
export const getUserPosts = ({ page, id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await Post.find({ userId: id })
        .sort({ creationDateAndTime: -1 })
        .skip((page - 1) * 10)
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

export const getReposts = ({ postId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const reposts = await Post.find({ originalPostId: postId });
      resolve(reposts);
    } catch (error) {
      reject(error);
    }
  });
};
 export const getPostById = ({postId})=>{
  return new Promise(async(resolve, reject)=>{
    try {
       const post = await Post.findOne({_id:postId}).populate("userId").populate("reposterId");
       resolve(post)
    }
    catch (error) {
      reject(error);
    }
  })
 }

export const editPost = ({postId, data})=>{
  return new Promise(async(resolve, reject)=>{
    try {
      const updatedPost = await Post.findOneAndUpdate({_id:postId}, { $set: { ...data } }, { new: true } );
      resolve(updatedPost)
    }
    catch (error) {
      reject(error);
    }
  })
}