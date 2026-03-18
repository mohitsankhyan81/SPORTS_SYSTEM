import mongoose from "mongoose";

const sessionSchema=new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"stud"
    }
})

export const session=mongoose.model("session",sessionSchema)