import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"


import { v2 as cloudinary } from 'cloudinary';
import createTokenAndSaveCookie from "../jwt/authToken.js";

export const register=async(req,res)=>{
   try {
    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json({message : "Phote is Required"})
    }
    const{photo}=req.files
    const allowedFormats=["image/jpeg","image/png","image/webp"]
    if(!allowedFormats.includes(photo.mimetype)){
        return res.status(400).json({message : "Invalid photo format only jpg and png are allowed"})
    }
    const{email,name,password,phone,education,role}=req.body
    if(!email || !name || !password || !phone || !education || !role ||!photo ){
        return res.status(400).json({message : "All Fields are required"})
    }
    const user=await User.findOne({email})
    if(user){
        return res.status(400).json({message:"User already exist"})
    }
    const cloudinaryResponse=await cloudinary.uploader.upload(
        photo.tempFilePath
    )
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log(cloudinaryResponse.error)
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({email,name,password:hashedPassword,phone,education,role,photo:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.url,
    }})
    await newUser.save()
    if(newUser){
     const token = await createTokenAndSaveCookie(newUser._id,res)
     console.log("signup ",token)
     return res.status(201).json({message:"User created successfully",newUser,token:token})
    }

   } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server error"})
   }
}

export const login=async(req,res)=>{
    const {email,password,role}=req.body;
    try {
        if(!email || !password || !role){
            return res.status(400).json({message:"Please fill require fields"})
        }
        const user=await User.findOne({email}).select("+password")
        if(!user.password){
            return res.status(400).json({message:"User password is missing"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!user,!isMatch){
            return res.status(400).json({message:"Invalid email or password"})
        }
        if(user.role!==role){
            return res.status(400).json({message:`${role} role not found`})
        }
        const token=await  createTokenAndSaveCookie(user._id,res)
        console.log("Login ",token)
        return res.status(200).json({message:"User Logged in successfully",user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            
        },token:token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}
export const logout =async(req,res)=>{
   try {
    res.clearCookie("JWT")
    return res.status(200).json({message:"User Logout Successfully"})
   } catch (error) {
    console.log(error)
    return res.status(500).json({error:"Internal server error"})
   }
}

export const getMyProfile=async(req,res)=>{
    const user =await req.user;
    res.status(200).json(user);

}

export const getAdmins=async(req,res)=>{
    const admins=await User.find({role:"admin"})
    res.status(200).json(admins);
}
