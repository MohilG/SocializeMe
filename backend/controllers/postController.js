import User from "../model/userModel.js";
import Post from "../model/postModel.js";
import {v2 as cloudinary} from 'cloudinary'
    export const createPost=async(req,res)=>{
        try {
            const {postedBy,title}=req.body
            let {img}=req.body
            // console.log(postedBy+ title);
            if(!postedBy || !title) return res.status(400).json({error:"Please enter all fields"})
            const user=await User.findById(postedBy);
        // console.log(req.user + " " );
            if(!user)return  res.status(401).json({error:'User not found'});
            if(req.user._id.toString()!==user._id.toString()){
                return res.status(401).json({error:"Unauthorized to create post"})
            }

            const maxLength=500
            if(title.length>maxLength){
                return res.status(400).json({error:"title length should be less than or equal to "+maxLength})
            }
            if(img){
                const uploadImg= await cloudinary.uploader.upload(img)
                img=uploadImg.secure_url
            }
            const newPost=new Post({postedBy,title,img})
            await  newPost.save();
            
            res.status(201).json(newPost)
            
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log("Error in Creating Post", error);   
        }
    }

export const getPost=async(req,res)=>{
    try {
        // console.log(req.params.postId);
        const post=await Post.findById(req.params.postId)
        if(!post){
            return res.status(404).json({message:"Post Not Found"})
        }
        // console.log(post);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in Getting Post", error);    
    }
}

export const deletePost=async(req,res)=>{
    try {
        const post =await Post.findById(req.params.postId)
        if(post.postedBy.toString()!==req.user._id.toString())return res.status(400).json({message:"Unauthorized to delete post"})

        if(!post){
            return res.status(404).json({error:"Post Not Found"})
        }
        if(post.img){
            const imgId=post.profilePic.split("/").pop().split(".")[0]
            await  cloudinary.uploader.destroy(imgId)
        }
        await Post.findByIdAndDelete(req.params.postId)
        res.status(201).json({message:"Post deleted successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message+"Error in Deleting Post" });
        // console.log("Error in Deleting Post", error);   
    }
}

export const likeUnlike=async(req,res)=>{
    try {
       const post=await Post.findById(req.params.postId)
       const userId=req.user._id

       if(!post) return res.status(404).json({message:"Post Not Found"})

       const liked=post.likes.includes(userId)
        
       if(liked){
          await Post.updateOne({_id:req.params.postId},{$pull:{likes:userId}})
       res.status(200).json({message:"Post Unliked"})

       }else{
           await Post.updateOne({_id:req.params.postId},{ $push : { likes : userId } })
       res.status(200).json({message:"Post Liked"})

       } 
       
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in Like/Dislike Post", error);   
    }
}

export const replyPost=async(req,res)=>{
    try {
       const post=await Post.findById(req.params.postId)
       const userId=req.user._id
        const username=req.user.username
        const userProfile=req.user.profilePic


        const text=req.body.text
       if(!post) return res.status(404).json({message:"Post Not Found"})
        if(!text)return res.status(400).json({message:"Add text"})
        const reply={userId,text,userProfile,username}
    post.replies.push(reply)
    await post.save()
    res.status(201).json(reply)
       
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in Replying Post", error);   
    }
}

    export const getFeed=async(req,res)=>{
        try {
        
        const userId=req.user._id
        const user=await User.findById(userId)
        let following=user.following
        //    console.log(following);
            if(!user)return res.status(404).json({error:"User Not Found"})
            if (!following || following.length === 0) {
                const posts = await Post.find({}).sort({ createdAt: -1 }).limit(5);
                return res.status(200).json(posts)
            }
            else{
                const posts=await Post.find({postedBy:{$in:following}}).sort({createdAt:-1})
                return res.status(200).json(posts)
        }
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log("Error in Getting Feed", error);   
        }
    }

export const getUserPost=async(req,res)=>{
    const {username}=req.params
    try {
        const user=await User.findOne({username})
        if(!user){
            res.status(404).json({error:"User Not Found"})
        }
        const post=await Post.find({postedBy:user._id}).sort('-createdAt')
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in Fetching User Posts", error);  
    }
}