import User from "../model/userModel.js"
import jwt from "jsonwebtoken";


const protectRoute=async(req,res,next)=>{
    try {
        const token = req.cookies.jwt; // Corrected cookie name to 'jwt'
        if (!token) return res.status(401).json({ message: "Unauthorized" });
        
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        
        // const user=await User.findById(decoded.userId).select("-password")
        req.user=user
        next()

    } catch (error) {
        res.status(500).json({message:error.message})
        console.log("Error in Protect Route"+error);
    }
}
export default protectRoute