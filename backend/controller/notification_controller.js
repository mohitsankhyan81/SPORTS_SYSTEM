import { notify } from "../model/notification_model.js";

export const createnotification=async(req,res)=>{
    console.log("hello")
    try{
        const {title,text,link}=req.body;
        
        if(!title || !text || !link){
            return req.status(400).json({success:false, message:"All fields are required"});
        }

        const creatednotification=await notify.create({title,text,link});

        if(creatednotification){
            return res.status(200).json({success:true,message:"notification create successfyly",creatednotification:creatednotification});
        }
    }
    catch(error){
        return res.status(400).json({success:false,error:error.message})
    }
}

export const getallnotification=async(req,res)=>{
    try{
        const alldata=await notify.find();
        if(alldata){
            return res.status(200).json({success:true,message:"All Anuncements",alldata:alldata})
        }
    }
    catch(error){
        return res.status(400).json({success:true,message:error.message})
    }
}

export const getsinglenotification=async(req,res)=>{
    try{
        const {id}=req.params;
        
        const notefication=await notify.findById(id);

        if(notefication){
            return res.status(200).json({success:true,message:"Get Notification",notefication:notefication})
        }
    }
    catch(error){
        return res.status(500).json({success:true,message:error.message})
    }
}