import User from "../model/userModel.js";
import Post from "../model/postModel.js";

export const createPost=async(req,res)=>{
    try {
        const {postedBy,title,img}=req.body
        if(!postedBy || !title) return res.status(400).json({msg:"Please enter all fields"})
        const user=await User.findById(postedBy);
        if(!user)return  res.status(401).json({msg:'User not found'});
        if(req.user._id.toString()!==user._id.toString()){
            return res.status(401).json({message:"Unauthorized to create post"})
        }

        const maxLength=500
        if(title.length>maxLength){
            return res.status(400).send("title length should be less than or equal to "+maxLength)
        }
        const newPost=new Post({postedBy,title,img})
        await  newPost.save();
        
        res.status(201).json({message:"Post created successfully",newPost})
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in Creating Post", error);   
    }
}