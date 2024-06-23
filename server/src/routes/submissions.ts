import express from "express"
import { executeCodeController, submitCodeController } from "../controllers/submissions";
import { auth } from "../middlewares/auth";

export const submissionRouter = express.Router();

submissionRouter.post("/execute", executeCodeController)
submissionRouter.post("/submit", submitCodeController)