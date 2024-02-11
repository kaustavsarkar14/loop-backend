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
      const postDoc = await postObj.save()
      resolve(postDoc)
    } catch (error) {
        reject(error)
    }
  });
};

export const getPosts = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
            const posts = await Post.find({})
            resolve(posts)
        } catch (error) {
            reject(error)
        }
    })
}
