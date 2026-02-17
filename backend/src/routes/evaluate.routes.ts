import express, { type Router } from "express";
import { evaluate } from "../controllers/evaluate.controller";
import { authenticate } from "../middlewares/auth";
import { evaluateQuerySchema } from "../schemas/evaluateSchema";

export const evaluateRouter: Router = express.Router();

evaluateRouter.get("/", authenticate, evaluate);
