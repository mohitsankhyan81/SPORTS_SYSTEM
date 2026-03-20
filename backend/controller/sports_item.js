import { sport } from "../model/sport_items.js";
import {v2 as cloudinary} from "cloudinary";
export const createSports=async(req,res)=>{
    try{
        if(!req.files || !req.files.photo){
            return res.status(400).json({success:false,message:"Blog photo is required"})
        }
        const {photo}=req.files;
        const isAllowed=["image/jpg","image/jpeg","image/png"];

        if(!isAllowed.includes(photo.mimetype)){
            return res.status(400).json({success:false,message:"photo format is not allowed"})
        }
        const {title,game,totalcount}=req.body
        if(!title||!game||!totalcount){
            return res.status(400).json({success:false,message:"fill all required filds"})
        }
        const cloudinaryres=await cloudinary.uploader.upload(
            photo.tempFilePath
        )
        if(!cloudinaryres){
            return res.status(400).json({success:false,message:"Image upload fail"})
        }
        const sportsData=await sport.create({title,game,totalcount,photo:{
            public_id:cloudinaryres.public_id,
            url:cloudinaryres.url
        }});
        if(totalcount>0){
            sportsData.isavilable=true;
            await sportsData.save();
        }

        return res.status(200).json({success:true,message:"Sports Itme register sucessfully",sportsData:sportsData})
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message});
    }
}

export const deleteSports=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        const sports=await sport.findById(id);
        if(!sports){
            return res.status(400).json({success:false,message:"blog not found"})
        }
        await sport.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"sports delete successfully"});
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message});
    }
}

export const updatesports=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success:false,message:"Invalid sports id"})
        }
        const update=await sport.findByIdAndUpdate(id,req.body,{new:true});

        if(!update){
            return res.status(400).json({success:false,message:"Sorts not found"});
        }
        return res.status(200).json({success:true,message:"Sports Updated",update:update});
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}

export const getallsports=async(req,res)=>{
    try{
        const data=await sport.find();
        return res.status(200).json({success:true,message:"ALL SPORTS",data:data})
    }
    catch{
        return res.status(500).json({success:false,message:error.message})
    }
}

export const getsinglesports=async(req,res)=>{
    try{
        const {id}=req.params;
        const sports=await sport.findById(id);
        if(!sports){
            return res.status(400).json({success:false,message:"Sports not found"});
        }
        return res.status(200).json({success:true,message:"Single blog",sports:sports});
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}

export const issueSports = async (req, res) => {
    try {
        const { id } = req.params;
        const { textarea } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid id"
            });
        }

        if (!textarea || textarea.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Enter at least one name"
            });
        }

        const sports = await sport.findById(id);

        if (!sports) {
            return res.status(400).json({
                success: false,
                message: "sports not found"
            });
        }

        const namesArray = textarea
            .split(",")
            .map(name => name.trim())
            .filter(name => name.length > 0);

        if (sports.totalcount < namesArray.length) {
            return res.status(400).json({
                success: false,
                message: "Not enough item available"
            });
        }

        sports.issuedto.push(...namesArray);

        sports.totalcount -= namesArray.length;

        if (sports.totalcount <= 0) {
            sports.isavilable = false;
        }

        await sports.save();

        return res.status(200).json({
            success: true,
            message: "sports issued successfully",
            sports
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};