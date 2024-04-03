    import User from "../model/userModel.js";
    import bcrypt from "bcryptjs"
    import generateTokenCookie from "../utils/helper/generateTokenCookie.js";
    import {v2 as cloudinary} from "cloudinary"
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

        res.status(201).json({_id:newUser._id,name:newUser.name,username:newUser.username,bio:newUser.bio,profilePic:newUser.profilePic,message:"SignUp Successfull"})
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
            generateTokenCookie(user._id,res)
            
        
        res.status(201).json({_id:user._id,name:user.name,username:user.username,email:user.email,bio:user.bio,profilePic:user.profilePic,message:"Login Successfull"})
        
    
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
    

    export const updateUser=async(req,res)=>{
        try {
            const {name,username,email,password,bio}=req.body
            let {profilePic}=req.body
            const existinguser=await User.findOne({$or:[{email:email || ""},{username:username || ""}]})
            // console.log(existinguser._id+" "+req.user._id);
                if(existinguser && existinguser._id.toString()!==req.user._id.toString())return res.status(400).json( {error:"Username or Email already exists"} )
            const user=await User.findById(req.user._id)
            if(req.params.id!==user._id.toString()){
                return res.status(400).json({error:"You can only edit your own profile."})
            }
            if(!user)return res.status(400).json({ error: "User Not Found" });
            if(password){
                const salt=await bcrypt.genSalt(10)
                const hashedPassword=await bcrypt.hash(password,salt)
                user.password=hashedPassword
            }
            if(profilePic){
                if(user.profilePic){
                    await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
                }
                const uploadRes=await cloudinary.uploader.upload(profilePic)
                profilePic=uploadRes.secure_url
            }
            user.name=name || user.name
            user.email=email || user.email
            user.bio=bio || user.bio
            user.username=username || user.username
            user.profilePic=profilePic || user.profilePic
            user.followers = user.followers;
            user.following=user.following
            // user.createdAt=user.createdAt
            await  user.save()
            res.status(200).json({_id:user._id,name:user.name,username:user.username,email:user.email,bio:user.bio,profilePic:user.profilePic})        
            // console.log(user);



        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log("Error in Updating", error);   
        }
    }

export const getUser=async(req,res)=>{
    const {username}=req.params
    
    try {
        const user=await User.findOne({username}).select("-password").select("-updatedAt")

        if(!user)return res.status(400).json({error:"User Not Found"})

        return  res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in Getting User Profile", error);   
    }
}