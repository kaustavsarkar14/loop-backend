import Comment from "../schema/Comment.js";

export const createComment = ({ userId, parentId, comment }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const commentObj = new Comment({ userId, parentId, comment });
            const commentDb = await commentObj.save();
            resolve(commentDb);
        } catch (error) {
            reject(error);
        }
    });
}

export const getComments = ({ parentId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const comments = await Comment.find({ parentId }).populate("userId");
            resolve(comments);
        } catch (error) {
            reject(error);
        }
    });
}