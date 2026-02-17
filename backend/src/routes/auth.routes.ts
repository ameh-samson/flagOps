import express, { type Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { validateReqBody } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../schemas/userSchema.js";

export const authRouter: Router = express.Router();

authRouter.post("/register", validateReqBody(registerSchema), registerUser);
authRouter.post("/login", validateReqBody(loginSchema), loginUser);
authRouter.post("/logout", logoutUser);
