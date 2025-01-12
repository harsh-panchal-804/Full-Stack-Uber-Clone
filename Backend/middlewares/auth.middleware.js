const userModel=require("../db/Models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const blackListModel=require("../db/Models/blacklistToken.model")
const captainModel=require("../db/Models/captain.model")

module.exports.authUser=async (req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const isBlacklisted=await blackListModel.findOne({token:token});
    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:"Cant find User"})
        }
        req.user=user;
        return next();
    }
    catch(err){
        return res.status(401).json({message:"Unauthsfsfsfsfsgorized"})
    }
}
module.exports.authCaptain=async (req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
   
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const isBlacklisted=await blackListModel.findOne({token:token});
    if(isBlacklisted){
        return res.status(402).json({message:"Unauthorized"})
    }
    try{
       
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captain=await captainModel.findById(decoded._id);
        if(!captain){
            return res.status(401).json({message:"Cant find Captain"})
        }
        req.captain=captain;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Unauthorasgsgized"})
    }
}