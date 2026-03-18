import express from "express"
import { login, register, verification } from "../controller/student_controller.js";

const studrouter=express.Router();

studrouter.post("/register",register)
studrouter.get("/verification",verification);
studrouter.post("/login",login);

export default studrouter