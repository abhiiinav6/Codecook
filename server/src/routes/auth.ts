import express from "express"
import { loginController, logoutController, mecontroller, signupController } from "../controllers/auth"

export const authRouter = express.Router()

authRouter.post("/signup", signupController)
authRouter.post("/login", loginController)
authRouter.get("/me", mecontroller)
authRouter.get("/logout", logoutController)