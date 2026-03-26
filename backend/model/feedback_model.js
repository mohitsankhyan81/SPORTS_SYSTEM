import mongoose from "mongoose";

const feedSchema=new mongoose.Schema({
    rating:{
        type:Number,
        require:true,
        min:0,
        max:10,
    },
    message:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"stud",
    }
})

export const feed=mongoose.model("feed",feedSchema);