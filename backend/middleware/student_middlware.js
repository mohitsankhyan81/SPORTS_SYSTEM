import jwt, { decode } from "jsonwebtoken"
import { stud } from "../model/student_model.js";
import dotenv from "dotenv"
dotenv.config();
export const authentcation=async(req,res,next)=>{
    try{
        const authorization=req.headers.authorization;
        if(!authorization || !authorization.startsWith("Bearer ")){
            return res.status(400).json({success:false, message:"access token is missing or invalid"});
        }

        const token=authorization.split(" ")[1];
        console.log("token",token);
        let decode;
        try{
            decode=jwt.verify(token,process.env.SECRET_KEY);
        }
        catch(error){
            if(error.name=="TokenExpiredError"){
                return res.status(400).json({success:false,message:"Access token is expred"})
            }
            return res.status(400).json({success:false,message:"fail to authenticate the user"})
        }

        const user=await stud.findById(decode.id);
        if(!user){
            return res.status(400).json({success:false,message:"user not found"});
        }

        req.userId=user._id;
        req.user=user;
        next();
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}

export const isadmin=(...roles)=>{
    return (req,res,next)=>{
        if(!req.user||!roles.includes(req.user.role)){
            return res.status(400).json({success:false,message:"user with the given role is not allower or user is not found"});
        }
        console.log(...roles)
        console.log(req.user);
        console.log(req.user.role);
        next();
    }
}