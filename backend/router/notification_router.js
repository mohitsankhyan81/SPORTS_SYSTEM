import express from "express"
import { authentcation, isadmin } from "../middleware/student_middlware.js";
import { createnotification, getallnotification, getsinglenotification } from "../controller/notification_controller.js";

const notificationrouter=express.Router();

notificationrouter.post("/createnotification",authentcation,isadmin("admin"),createnotification);
notificationrouter.get("/getallnotification",authentcation,getallnotification);
notificationrouter.get("/getsinglenotification/:id",authentcation,getsinglenotification);

export default notificationrouter