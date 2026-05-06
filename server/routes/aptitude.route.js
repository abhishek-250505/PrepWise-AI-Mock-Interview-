import express from "express";
import { generateAptitudeQuestions } from "../controllers/aptitude.controller.js";

const aptitudeRouter = express.Router();

aptitudeRouter.post("/generate-questions", generateAptitudeQuestions);

export default aptitudeRouter;
