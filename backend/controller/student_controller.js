import { stud } from "../model/student_model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { verifyemail } from "../emailverify/verifyemail.js";
import { session } from "../model/session_model.js";
export const register = async (req, res) => {
    try {
        const { studname,studid, email, password ,role} = req.body;
        if(!studname || !email || !password ||!studid ||!role){
            return res.status(400).json({success:false,message:"Fill all the require Fields"})
        }
        console.log(req.body)

        const user=await stud.findOne({email});
        if(user){
            return res.status(400).json({success:false,message:"user already register"})
        }
        const hashpassword=await bcrypt.hash(password,10);

        const newUser=await stud.create({studname,role,studid,email,password:hashpassword});
        const token=jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn:'7d'})
        await verifyemail(token,email)
        newUser.token=token
        await newUser.save();
        return res.status(200).json({success:true,message:"User Register Sucessfully",newUser:newUser})
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success:false,error: "Server error" })
    }
}

export const verification=async(req,res)=>{
    try{
        const authorization=req.headers.authorization

        if(!authorization && !authorization.startsWith("Bearer ")){
            return res.status(400).json({success:false, message:"authrization token is missing or undefined"})
        }

        console.log("authorization "+authorization);
        const token=authorization.split(" ")[1];
        console.log("token is "+token);

        let decode;
        try{
            decode=jwt.verify(token,process.env.SECRET_KEY)
        }
        catch(error){
            if(error.name=="TokenExpiredError"){
                return res.status(400).json({success:false,message:"Registration token is exprired"})
            }
            return res.status(400).json({success:false,message:"User verification fail"})
        }

        const user=await stud.findById(decode.id)
        if(!user){
            return res.status(400).json({success:false,message:"user not found"})
        }
        user.token=null;
        user.isVerified=true
        await user.save()
        return res.status(200).json({success:true,message:"user verify successfully"})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false,error:error.message})
    }
}

export const login=async(req,res)=>{
    try{
        const {studid,email,password}=req.body;
        console.log(req.body)
        if(!studid ||!email || !password){
            return res.status(400).json({success:false, message:"Fill all required Fields"});
        }

        const user=await stud.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"User not Found"})
        }

        const comparepass=await bcrypt.compare(password,user.password)
        if(!comparepass){
            return res.status(400).json({success:false,message:"incroccet password"})
        }
        if(!user.isVerified){
            return res.status(400).json({success:false, message:"user not verified"});
        }
        //existing session
        const existingsession=await session.findOne({userid:user._id});
        if(existingsession){
            await session.deleteOne({studid:user._id})
        }
        //createing new Session

        await session.create({studid:user._id})
        await session.findOne({studid})
        //accesstoken
        const accesstoken=jwt.sign({id:user._id},process.env.SECRET_KEY,{
            expiresIn:"10d"
        })
        //refereshtoken
        const refreshtoken=jwt.sign({id:user._id},process.env.SECRET_KEY,{
            expiresIn:"30d"
        })

        user.isLoggedIn=true
        await user.save();
        
        return res.status(200).json({success:true,message:"User login Successfully",accesstoken,refreshtoken,user:user})
    }
    catch(error){
        return res.status(500).json({success:false ,error:error.message})
    }
}


export const logout=async(req,res)=>{
    console.log("This is for logout")
}