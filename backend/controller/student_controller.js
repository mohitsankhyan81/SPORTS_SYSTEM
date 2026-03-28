import { stud } from "../model/student_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyemail } from "../emailverify/verifyemail.js";
import { session } from "../model/session_model.js";
import { v2 as cloudinary } from 'cloudinary';
export const register = async (req, res) => {
    try {

        if(!req.files || !req.files.photo){
            return res.status(400).json({success:false,message:"photo is required"})
        }
        const {photo}=req.files

        const allowedformat=["image/jpg","image/png","image/jpeg"];

        if(!allowedformat.includes(photo.mimetype)){
            return res.status(400).json({success:false,message:"image format is not correct"})
        }
        const { studname, studid, email, password, role } = req.body;

        if (!studname || !studid || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Fill all required fields"
            });
        }

        const existingUser = await stud.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const cloudinaryres=await cloudinary.uploader.upload(
            photo.tempFilePath
        )
        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = await stud.create({
            studname,
            studid,
            email,
            password: hashpassword,
            role,
            photo:{
                public_id:cloudinaryres.public_id,
                url:cloudinaryres.url
            },
            isVerified: false
        });

        const token = jwt.sign(
            { id: newUser._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        verifyemail(email,token);
        newUser.token=token
        await newUser.save();
        return res.status(200).json({
            success: true,
            message: "Registered successfully. Please verify email",
            newUser:newUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const verification = async (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(400).json({
                success: false,
                message: "Token missing or invalid"
            });
        }

        const token = authorization.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(400).json({
                    success: false,
                    message: "Token expired"
                });
            }
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            });
        }

        const user = await stud.findById(decoded.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        user.isVerified = true;
        user.token=null;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fill all required fields"
            });
        }

        const user = await stud.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email"
            });
        }

        // delete old session
        await session.deleteOne({ studid: user._id });

        // create new session
        await session.create({ studid: user._id });

        // tokens
        const accesstoken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "10d" }
        );
        
        const refreshtoken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "30d" }
        );

        user.isLoggedIn = true;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accesstoken,
            refreshtoken,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const logout = async (req, res) => {
    try{
        const userId=req.userId;

        await session.deleteMany({studid:userId})

        await stud.findByIdAndUpdate(userId,{isLoggedIn:false})

        return res.status(200).json({success:true,message:"User logout successfully"});
    }
    catch(error){
        return res.status(500).json({success:false,error:error.message});
    }
};

export const getprofile=async(req,res)=>{
    try{
        const {id}=req.params

        const student= await stud.findById(id);
        if(student){
            return res.status(200).json({success:true,message:"Student profile",student:student})
        }
    }
    catch(error){
        return res.status(400).json({success:false,error:error.message})
    }
}

export const myprofile=async(req,res)=>{
    try{
        const user=await req.user;
        return res.status(200).json({user:user});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:error.message})
    }
}