import User from "../model/userModel.js"


const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookie.jwt
        if(!token)res.status(401).json({message:"Unauthorized"})
        const decoded=jwt.verify(token,process.env.SECRET)

        const user=await User.findById(decoded.userId).select("-password")
        req.user=user
        next()

    } catch (error) {
        res.status(500).json({message:error.message})
        console.log("Error in Protect Route");
    }
}
export default protectRoute