import express from "express"
import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose";
import studrouter from "./router/student_router.js";
dotenv.config();
const app=express();
app.use(express.json())
const MONGO_URI=process.env.MONGO_URI
try{
    mongoose.connect(MONGO_URI)
    console.log("Connected Successfully")
}
catch(error){
    console.log(error.message);
}
app.use("/api/stud",studrouter)
const port=process.env.PORT || 3455;
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})