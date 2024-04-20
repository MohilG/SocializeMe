    import User from "../model/userModel.js";
    import bcrypt from "bcryptjs"
    import generateTokenCookie from "../utils/helper/generateTokenCookie.js";
    import {v2 as cloudinary} from "cloudinary"
import mongoose from "mongoose";
import Post from "../model/postModel.js";
//  import jwt from 'jsonwebtoken'
    export const signUp = async(req,res) => {
        // console.log(req.body);
    try {
        const {name,username,email,password} = req.body;
        const user=await User.findOne({$or:[{email},{username}]})

        if(user){
    return res.status(400).json({error: 'User Already Exists !'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        const newUser=new User({
        name,
        username,
        email,
        password:hashedPassword
        })
        
        await newUser.save()
    
        if(newUser){
            generateTokenCookie(newUser._id,res)

        res.status(201).json({_id:newUser._id,name:newUser.name,username:newUser.username,bio:newUser.bio,profilePic:newUser.profilePic,isFrozen:false})
        }
        else{
        res.status(400).json({error: 'Invalid User Data !'})

        }

    } catch (error) {
        res.status(500).json({error: error.message})
        console.log("Error in Sign Up", error);
    }
    }

    export const login = async(req,res) => {
        // console.log("hello");
        
        try {
        const {username,password} = req.body;
        const user=await User.findOne({username})
            const isPassword=await bcrypt.compareSync(password,user?.password || "")

            if(!user || !isPassword){
                return res.status(401).json({error:'Invalid Username or Password!'});
            }
            if(user.isFrozen){
                user.isFrozen=false
                await user.save()
            }
            generateTokenCookie(user._id,res)
            
        
        res.status(201).json({_id:user._id,name:user.name,username:user.username,email:user.email,bio:user.bio,profilePic:user.profilePic,isFrozen:user.isFrozen})
        
    
        } catch (error) {
        res.status(500).json({error: error.message})
        console.log("Error in Login", error);
        }
    }

    export const logout=async(req,res)=>{
        try {
            res.cookie("jwt", "", { maxAge: 1 });
            res.status(200).json({ message: "User logged out successfully" });
        }  catch (error) {
            res.status(500).json({message: error.message})
            console.log("Error in Logout", error);
        }
    }

    export const followUnfollow = async (req, res) => {
        try {
            // const token = req.cookies.jwt; // Corrected cookie name to 'jwt'
            // if (!token) return res.status(401).json({ message: "Unauthorized" });
            
            // const decoded = jwt.verify(token, process.env.SECRET);
            // const curUser = await User.findById(decoded.userid).select("-password");
            
            const { id } = req.params; // Corrected accessing params
            console.log(id);
            const curUser=await User.findById(req.user._id)
            const userToModify = await User.findById(id);
            if (id === req.user._id.toString()) return res.status(400).json({ error: "You can't Follow/Unfollow yourself" });
            if (!userToModify || !curUser) return res.status(400).json({ error: "User Not Found" });
    
            const isFollowing = curUser.following.includes(id);
            if (isFollowing) {
                await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
                await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
                res.status(200).json({ message: "Unfollowed successfully" });

            } else {
                await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
                await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
                res.status(200).json({ message: "Followed successfully" });

            }
    
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log("Error in Follow/Unfollow", error);
        }
    };
    

    export const updateUser = async (req, res) => {
        try {
            const { name, username, email, password, bio } = req.body;
            let { profilePic } = req.body;
            const existingUser = await User.findOne({ $or: [{ email: email || "" }, { username: username || "" }] });
            const userId = req.user._id
            if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
                return res.status(400).json({ error: "Username or Email already exists" });
            }
    
            const user = await User.findById(req.user._id);
    
            if (req.params.id !== user._id.toString()) {
                return res.status(400).json({ error: "You can only edit your own profile." });
            }
    
            if (!user) {
                return res.status(400).json({ error: "User Not Found" });
            }
    
            if (password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                user.password = hashedPassword;
            }
    
            if (profilePic) {
                try {
                    if (user.profilePic) {
                        await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
                    }
                    const uploadRes = await cloudinary.uploader.upload(profilePic);
                    profilePic = uploadRes.secure_url;
                } catch (cloudinaryError) {
                    console.log("Error in Cloudinary:", cloudinaryError);
                    profilePic = ''; // Set profilePic as empty string if Cloudinary link is not found
                }
            }
    
            user.name = name || user.name;
            user.email = email || user.email;
            user.bio = bio || user.bio;
            user.username = username || user.username;
            user.profilePic = profilePic || user.profilePic;
            user.followers = user.followers;
            user.following = user.following;
    
            await user.save();
    
            await Post.updateMany(
                { 'replies.userId': userId },
                {
                    $set: {
                        'replies.$[reply].userName': user.username,
                        'replies.$[reply].userProfile': user.profilePic
                    }
                },
                { arrayFilters: [{ 'reply.userId': userId }] }
            );
    
            res.status(200).json({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profilePic: user.profilePic
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log("Error in Updating:", error);
        }
   s };
  
   export const freezeAccount=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id)
        if(!user){
          return  res.status(401).json({msg:"User not found"})
        }
        user.isFrozen=true
        
        await user.save()
        // console.log(user);
        res.status(200).json({message: "Account has been frozen"})
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in Freezing Account:", error);
    }
   }
   export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const usersFollowedByYou = await User.findById(userId).select("following");

        const users = await User.aggregate([
            {
                "$match": { "_id": { "$ne": userId }, "isFrozen": false }
            },
            { $sample: { size: 10 } }
        ]);
        
        const filteredUsers = users.filter(user => !usersFollowedByYou.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0, 8 );
        suggestedUsers.forEach(user => user.password = null);
        
        res.status(200).json(suggestedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in Suggested Users:", error);
    }
}


    

export const getUser=async(req,res)=>{
    const {query}=req.params
    // console.log((query));
    
    try {
        let user;
        if(mongoose.Types.ObjectId.isValid(query)){
             user=await User.findOne({_id:query}).select("-password").select("-updatedAt")
        }
        else{
             user=await User.findOne({username:query}).select("-password").select("-updatedAt")

        }

        if(!user)return res.status(400).json({error:"User Not Found"})

        return  res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in Getting User Profile", error);   
    }
}