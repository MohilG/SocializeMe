import jwt from "jsonwebtoken"
const generateTokenCookie=(userId,res)=>{
    console.log(userId);
    const token=jwt.sign({userId},process.env.SECRET,{
        expiresIn:'15d'
    })
    // console.log(token);
    res.cookie("jwt",token,{httpOnly:false,maxAge:15*24*60*60*1000,sameSite: 'strict'})
    return token
}

export default generateTokenCookie