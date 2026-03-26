import mongoose from "mongoose";

const notificationSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        rquired:true
    },
    createBy:{
        type:mongoose.Schema.ObjectId,
        ref:"stud"
    }
},{timestamps:true})

export const notify=mongoose.model("notify",notificationSchema);