import express from 'express'
import { authentcation, isadmin } from '../middleware/student_middlware.js';
import { createfeedback, getallfeedback } from '../controller/feedback_controller.js';

const feedbackrouter=express.Router();

feedbackrouter.post("/feedback/:id",authentcation,createfeedback);
feedbackrouter.get("/getallfeedback",authentcation,isadmin("admin"),getallfeedback);
export default feedbackrouter