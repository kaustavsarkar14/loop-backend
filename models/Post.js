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
          let posts = [];

          const followingUsersPosts = await Post.aggregate([
              {
                  $match: {
                      $or: [
                          { userId: { $in: followingUserIds } },
                          { reposterId: { $in: followingUserIds } }
                      ]
                  },
              },
              {
                  $sort: { creationDateAndTime: -1 },
              },
              {
                  $facet: {
                      data: [{ $skip: (page - 1) * 10 }, { $limit: 10 }],
                  },
              },
          ]);

          const followingPostsData = followingUsersPosts[0].data;
          await Post.populate(followingPostsData, [{ path: 'userId' }, { path: 'reposterId' }]);

          if (followingPostsData.length === 10) return resolve(followingPostsData);

          const nonFollowingUsersPosts = await Post.aggregate([
              {
                  $match: {
                      $and: [
                          { userId: { $nin: followingUserIds } },
                          { reposterId: { $nin: followingUserIds } }
                      ]
                  },
              },
              {
                  $sort: { creationDateAndTime: -1 },
              },
              {
                  $facet: {
                      data: [
                          { $skip: (page - 1) * 10 },
                          { $limit: 10 - followingPostsData.length },
                      ],
                  },
              },
          ]);

          const nonFollowingPostsData = nonFollowingUsersPosts[0].data;
          await Post.populate(nonFollowingPostsData, [{ path: 'userId' }, { path: 'reposterId' }]);

          posts = [...followingPostsData, ...nonFollowingPostsData];
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
