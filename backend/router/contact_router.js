import express from "express"
import { authentcation, isadmin } from "../middleware/student_middlware.js";
import { contactcontroller, getcontactreport } from "../controller/contact_controller.js";

const contactrouter=express.Router();

contactrouter.post("/contact-form",authentcation,contactcontroller);
contactrouter.get("/getcontactreport",authentcation,isadmin("admin"),getcontactreport);
export default contactrouter;