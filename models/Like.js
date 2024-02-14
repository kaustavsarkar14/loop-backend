import Like from "../schema/Like.js";

export const like = ({ postId, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isLiked = await Like.findOne({postId, userId});
      if (isLiked) return reject({ message: "Already liked" });
      const likeObj = new Like({ userId, postId });
      const likeDb = await likeObj.save();
      resolve(likeDb);
    } catch (error) {
      reject(error);
    }
  });
};
export const unLike = ({ postId, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const likeDoc = await Like.findOne({postId, userId});
      if (!likeDoc) return reject({ message: "No like db found" });
      const unLikeDoc = await Like.findOneAndDelete({postId, userId})
      resolve(unLikeDoc);
    } catch (error) {
      reject(error);
    }
  });
};
export const findLikesByPostId = ({postId})=>{
    return new Promise(async(resolve, reject)=>{
        try {
            const likeDocs = await Like.find({postId})
            resolve(likeDocs)
        } catch (error) {
            reject(error)
        }
    })
}
