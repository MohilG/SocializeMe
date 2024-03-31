    import User from "../model/userModel.js";
    import bcrypt from "bcryptjs"
    import generateTokenCookie from "../utils/helper/generateTokenCookie.js";

    export const signUp = async(req,res) => {
    try {
        const {name,username,email,password} = req.body;
        const user=await User.findOne({$or:[{email},{username}]})

        if(user){
    return res.status(400).json({message: 'User Already Exists !'})
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

        res.status(201).json({_id:newUser._id,name:newUser.name,username:newUser.username})
        }
        else{
        res.status(400).json({message: 'Invalid User Data !'})

        }

    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error in Sign Up", error);
    }
    }

    export const login = async(req,res) => {
        try {
        const {username,password} = req.body;
        const user=await User.findOne({username})
            const isPassword=await bcrypt.compareSync(password,user?.password || "")

            if(!user || !isPassword){
                return res.status(401).json({message:'Invalid Username or Password!'});
            }
            generateTokenCookie(user._id,res)
            
        
        res.status(201).json({_id:user._id,name:user.name,username:user.username,email:user.email})
        
    
        } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error in Login", error);
        }
    }

    export const logout=async(req,res)=>{
        try {
        if (req.cookies.jwt) {
                 res.clearCookie("jwt");
        } else {
                return res.status(400).json({ message: "No active session to logout from" });
            }
           res.status(200).json({message:"Logged Out Successfully"})
        } catch (error) {
            res.status(500).json({message: error.message})
            console.log("Error in Sign Up", error);
        }
    }

    export const followUnfollow=async(req,res)=>{
    try {
        const {iD}=req.params()
        const userToModify=await User.findById(iD)
        const curUser=await User.findById(req.user._id)
        if(iD===req.user._id)res.status(400).json({message:"You can't Follow/Unfollow yourself"})
        if(!userToModify || !curUser)res.status(400).json({message:"User Not Found"})

        const isFollowing=curUser.following.includes(iD)
        if(isFollowing){
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:iD}})
            await User.findByIdAndUpdate(iD,{$pull:{follower:req.user._id}})
        }else{
            await User.findByIdAndUpdate(req.user._id,{$push:{following:iD}})
            await User.findByIdAndUpdate(iD,{$push:{follower:req.user._id}})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error in Follow/Unfollow", error);
    }
    }