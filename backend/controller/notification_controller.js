import mongoose from "mongoose";
import { notify } from "../model/notification_model.js";

export const createnotification=async(req,res)=>{
    console.log("hello")
    try{
        const {title,text,link}=req.body;
        
        if(!title || !text || !link){
            return req.status(400).json({success:false, message:"All fields are required"});
        }

        const creatednotification=await notify.create({title,text,link,createBy: req.user._id});

        if(creatednotification){
            return res.status(200).json({success:true,message:"notification create successfyly",creatednotification:creatednotification});
        }
    }
    catch(error){
        return res.status(400).json({success:false,error:error.message})
    }
}

export const deletenotification=async(req,res)=>{
    try{
        const {id}=req.params;
        
        const notification=await notify.findById(id);

        if(!notification){
            return res.status(400).json({success:false,message:"Notification not found"});
        }
        await notify.findByIdAndDelete(id);

        return res.status(200).json({success:true,message:"Notification delete successfully"})
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}

export const updatenotification=async(req,res)=>{
    try{
        const {id}=req.params;
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success:false,message:"Not valid id"});
        }

        const data=await notify.findByIdAndUpdate(id,req.body,{new:true});

        if(!data){
            return res.status(400).json({success:false,message:"notifcation not found"})
        }

        return res.status(400).json({success:true,message:"Notification update successfully"})

    }
    catch(error){
        return res.status(500).json({success:false,message:error.message});
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

export const annuncementcreatebyme=async(req,res)=>{
    try{
        const myannuncement=await notify.find({createBy:req.user._id})
        return res.status(200).json({success:true,message:myannuncement})
    }
    catch(error){
        return res.status(500).json({success:false,error:error.message})
    }
}