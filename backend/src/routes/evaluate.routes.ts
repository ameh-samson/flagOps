import express, { type Router } from "express";
import { evaluate } from "../controllers/evaluate.controller";

export const evaluateRouter: Router = express.Router();

evaluateRouter.get("/", evaluate);
