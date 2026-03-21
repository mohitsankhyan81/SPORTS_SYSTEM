import express from "express"
import { getprofile, login, logout, register, verification } from "../controller/student_controller.js";
import { authentcation } from "../middleware/student_middlware.js";

const studrouter=express.Router();

studrouter.post("/register",register)
studrouter.get("/verification",verification);
studrouter.post("/login",login);
studrouter.get("/logout",authentcation,logout);
studrouter.get("/getprofile/:id",authentcation,getprofile);
export default studrouter