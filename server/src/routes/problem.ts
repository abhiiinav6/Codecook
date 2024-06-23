import express from "express"
import { getProblemByIdController, getAllProblemsController } from "../controllers/problem";

export const problemRouter = express.Router();

problemRouter.get("/", getAllProblemsController)
problemRouter.get("/:id",getProblemByIdController)