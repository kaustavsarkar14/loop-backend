import {
  createPost,
  deletePost,
  findPostById,
  getPosts,
  getPublicPosts,
} from "../models/Post.js";

export const handleCreatePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, image } = req.body;
    const postDoc = await createPost({ userId, title, image });
    return res.status(201).json(postDoc);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const handleGetAllPosts = async (req, res) => {
  const page = req.query.page
  try {
    const posts = await getPosts({page});
    return res.status(200).json(posts);
  } catch (error) {
    return res.send(500).json({ error: error.message });
  }
};
export const handleGetAllPublicPosts = async (req, res) => {
  const page = req.query.page
  try {
    const posts = await getPublicPosts({page});
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
