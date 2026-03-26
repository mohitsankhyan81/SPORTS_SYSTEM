import mongoose from "mongoose";
import validator from "validator"
const studentSchema = new mongoose.Schema({
    studname: { type: String, required: true },
    studid: { type: String, required: true },
    email: { 
        type: String,
        required: true,
        unique: true,
        validate:[validator.isEmail,"This is not correct format"]
     },
     photo:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
     },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], required: true },
    token: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false }
}, { timestamps: true });

export const stud = mongoose.model("stud", studentSchema);