import { createPost, getPosts, getPublicPosts } from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, image } = req.body;
    const postDoc = await createPost({ userId, title, image });
    return res.status(201).json(postDoc);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
 
export const getAllPosts = async (req, res) => { 
  try {
    const posts = await getPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.send(500).json({ error: error.message });
  }
};
export const getAllPublicPosts = async (req, res) => { 
  try {
    const posts = await getPublicPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.send(500).json({ error: error.message });
  }
};
