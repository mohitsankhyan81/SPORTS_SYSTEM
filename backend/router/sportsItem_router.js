import express from "express"
import { createSports, deleteSports, getallsports, getsinglesports, issueSports, updatesports } from "../controller/sports_item.js";
import { authentcation, isadmin } from "../middleware/student_middlware.js";
import { sport } from "../model/sport_items.js";

const sportsrouter=express.Router();

sportsrouter.post("/sports-creation",authentcation,isadmin("admin"),createSports);
sportsrouter.get("/deleteSports/:id",authentcation,isadmin("admin"),deleteSports);
sportsrouter.put("/updateSports/:id",authentcation,isadmin("admin"),updatesports);
sportsrouter.get("/getallsports",authentcation,getallsports);
sportsrouter.get("/getsinglesports/:id",authentcation,getsinglesports);
sportsrouter.post("/issuesportsitem/:id",authentcation,issueSports);
export default sportsrouter;