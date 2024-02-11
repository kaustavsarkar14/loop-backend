import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    followingUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required : true
    },
    followerUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required : true
    },
    creationDateAndTime: {
        type: Date,
        required: true
    },
})

export default mongoose.model('follow', followSchema)