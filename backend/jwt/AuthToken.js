import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

const createTokenAndSaveCookie=async(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"28d"})
    res.cookie("JWT",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
    })
    await User.findByIdAndUpdate(userId,{token})
    return token
}

export default  createTokenAndSaveCookie