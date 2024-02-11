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
        required : true,
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
    }
})

export default  mongoose.model("post", postSchema)