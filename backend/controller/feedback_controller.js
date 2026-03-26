import { feed } from "../model/feedback_model.js";

export const createfeedback=async(req,res)=>{
    try{
        const {rating,message}=req.body

        if(rating == undefined){
            return res.status(400).json({success:false,message:"Rating is requried"});
        }

        const feedback=await feed.create({rating,message,user:req.user?._id});
        
        return res.status(400).json({success:true,message:"feedback send",feedback:feedback})
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}

export const getallfeedback=async(req,res)=>{
    try{
        const data=await feed.find();
        return res.status(200).json({success:true,message:"All feedbacks is gated",data:data})
    }
    catch(error){
        return res.status(500).json({success:true,message:error.message})
    }
}