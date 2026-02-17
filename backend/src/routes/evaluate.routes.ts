import express, { type Router } from "express";
import { evaluate } from "../controllers/evaluate.controller.js";
import { authenticate } from "../middlewares/auth.js";

export const evaluateRouter: Router = express.Router();

evaluateRouter.get("/", authenticate, evaluate);
