import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
        minLength: 3,
        maxLength: 50
    },
    image: {
        type: String,
        default: ""
    },
    creationDateAndTime : {
        type : Date,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,        
        required : true,
        ref: 'user'
    },
    isDeleted : {
        type: Boolean,
        required : true,
        default : false
    },
    isRepost: {
        type: Boolean,
        default: false
    },
    reposterId: {
        type : mongoose.Schema.Types.ObjectId,        
        ref: 'user' 
    },
    originalPostId : {
        type : mongoose.Schema.Types.ObjectId,        
        ref: 'post' 
    }
})

export default  mongoose.model("post", postSchema)