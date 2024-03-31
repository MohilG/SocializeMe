import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    title:{
        type:String,
        maxLength:500
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
   
    img:{
        type:String,
    },
    likes:{
        type:Number,
        default:0
    },
    replies:[{
       userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
       },
       text:{
        type:String,
        required:true
       },
       userProfile:{
        type:String
       },
       username:{
        type:String
       }
    }],
   
},{timestamps:true})

const Post=mongoose.model('Post',postSchema)

export default Post;