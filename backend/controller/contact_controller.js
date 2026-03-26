import { cont } from "../model/contact_model.js"
export const contactcontroller=async(req,res)=>{
    try{
        const {name,studid,email,message}=req.body

        if(!name || !studid || !email || !message){
            return res.status(400).json({success:false,message:"fill all required fields"})
        }

        const newdata= await cont.create({name,studid,email,message})
        if(newdata){
            return res.status(200).json({success:true,message:"Contact form submit",newdata:newdata})
        }   
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}

export const getcontactreport=async(req,res)=>{
    try{
        const contacts=await cont.find();
        res.status(200).json({success:true,message:"Show All problem and Comments",contacts})
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}