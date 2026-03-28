import express from "express"
import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose";
import studrouter from "./router/student_router.js";
import sportsrouter from "./router/sportsItem_router.js";
import {v2 as cloudinary} from "cloudinary"
import fileUpload from "express-fileupload";
import contactrouter from "./router/contact_router.js";
import notificationrouter from "./router/notification_router.js";
import feedbackrouter from "./router/feedback_router.js";
import cors from "cors"
dotenv.config();
const app=express();
app.use(express.json())
app.use(cors({
    origin:process.env.FRONT_END ||"http://localhost:5173",
    credentials:true
}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

app.get("/h",(req,res)=>{
    res.send("hello")
})
const MONGO_URI=process.env.MONGO_URI;
try{
    mongoose.connect(MONGO_URI)
    console.log("Connected Successfully")
}
catch(error){
    console.log(error.message);
}
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
app.use("/api/stud",studrouter);
app.use("/api/sport",sportsrouter);
app.use("/api/cont",contactrouter);
app.use("/api/note",notificationrouter);
app.use("/api/feed",feedbackrouter);
const port=process.env.PORT || 3455;
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})