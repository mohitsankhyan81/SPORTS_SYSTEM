import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studname: { type: String, required: true },
    studid: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], required: true },
    token: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false }
}, { timestamps: true });

export const stud = mongoose.model("stud", studentSchema);