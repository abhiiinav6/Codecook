import express from "express"
import { executeCodeController, getSubmissionByIdController, submitCodeController } from "../controllers/submissions";

export const submissionRouter = express.Router();

submissionRouter.post("/execute", executeCodeController)
submissionRouter.post("/submit", submitCodeController)

submissionRouter.get("/:id",getSubmissionByIdController)