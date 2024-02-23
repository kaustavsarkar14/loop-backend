import { getFollowings } from "../models/Follow.js";
import {
  createPost,
  deletePost,
  editPost,
  findPostById,
  getPostById,
  getPosts,
  getPublicPosts,
  getReposts,
  getUserPosts,
} from "../models/Post.js";
import Post from "../schema/Post.js";

export const handleCreatePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, image, isRepost, reposterId, originalPostId } = req.body;
    let postDoc;
    if (!isRepost) {
      postDoc = await createPost({
        userId,
        title,
        image,
      });
    } else {
      postDoc = await createPost({
        userId: req.body.userId,
        isRepost,
        reposterId,
        originalPostId,
        title,
        image,
      });
    }
    return res.status(201).json(postDoc);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const handleGetAllPosts = async (req, res) => {
  const page = req.query.page;
  const userId = req.user._id;
  try {
    const followingUserIds = (await getFollowings(userId)).map(
      (followDb) => followDb.followingUserId._id
    );
    const posts = await getPosts({ page, userId, followingUserIds });
    // console.log(posts)
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message }); 
  }
};
export const handleGetAllPublicPosts = async (req, res) => {
  const page = req.query.page;
  try {
    const posts = await getPublicPosts({ page });
    return res.status(200).json(posts);
  } catch (error) {
    return res.send(500).json({ error: error.message });
  }
};
export const handleGetUserPosts = async (req, res) => {
  const { id } = req.params;
  const page = req.query.page;
  try {
    const posts = await getUserPosts({ page, id });
    return res.status(200).json(posts);
  } catch (error) {
    return res.send(500).json({ error: error.message });
  }
};
export const handlePostDelete = async (req, res) => {
  try {
    const postId = req.body.postId;
    const post = await findPostById({ postId });
    if (!post) return res.status(400).json({ message: "No post found." });
    if (!post.userId.equals(req.user._id))
      return res.status(401).json({ message: "Unauthorized request" });
    const deletedPost = await deletePost({ postId });
    return res.status(200).json(deletedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const handleUndoRepost = async (req, res) => {
  try {
    const postId = req.body.postId;
    const post = await findPostById({ postId });
    if (!post) return res.status(400).json({ message: "No post found." });
    const deletedPost = await Post.findOneAndDelete({
      reposterId: req.user._id,
      originalPostId: post._id,
    });
    await Post.findOneAndUpdate({ _id: postId }, { isRepost: false });
    return res.status(200).json(deletedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const handleGetReposts = async (req, res) => {
  try {
    const reposts = await getReposts({ postId: req.body.postId });
    return res.status(200).json(reposts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const handleGetPostById = async (req, res) => {
  try {
    const post = await getPostById({ postId: req.params.id });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const handleEditPost = async (req, res) => {
  try {
    const postId = req.body.postId;
    const post = await findPostById({ postId });
    if (!post) return res.status(400).json({ message: "No post found." });
    // if (!post.userId.equals(req.user._id))
    //   return res.status(401).json({ message: "Unauthorized request" });
    const updatedPost = await editPost({ postId, data: req.body.data });
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}