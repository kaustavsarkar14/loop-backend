import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    postId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required : true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required : true
    },
})

export default mongoose.model('like', likeSchema)