import { createComment, getComments } from "../models/Comment.js";

export const handleCreateComment = async (req, res) => {
    try {
        const userId = req.user._id;
        const { parentId, comment } = req.body;
        const commentDb = await createComment({ userId, parentId, comment });
        return res.status(201).json(commentDb );
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const handleGetComments = async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await getComments({ parentId:id });
        return res.status(200).json(comments);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}