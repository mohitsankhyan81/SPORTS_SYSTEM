import express from "express"
import { authentcation, isadmin } from "../middleware/student_middlware.js";
import { annuncementcreatebyme, createnotification, deletenotification, getallnotification, getsinglenotification, updatenotification } from "../controller/notification_controller.js";

const notificationrouter=express.Router();

notificationrouter.post("/createnotification",authentcation,isadmin("admin"),createnotification);
notificationrouter.get("/getallnotification",authentcation,getallnotification);
notificationrouter.get("/getsinglenotification/:id",authentcation,getsinglenotification);
notificationrouter.get("/deletenotification/:id",authentcation,deletenotification);
notificationrouter.put("/updatenotification/:id",authentcation,updatenotification);
notificationrouter.get("/myannucement",authentcation,isadmin("admin"),annuncementcreatebyme);
export default notificationrouter