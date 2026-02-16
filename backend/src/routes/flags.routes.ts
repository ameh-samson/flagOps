import express from "express";
import { createFlag, getFlags } from "../controllers/flags.controller";
import { authenticate } from "../middlewares/auth";
import { requireAdmin } from "../middlewares/checkRole";
import { validateReqBody } from "../middlewares/validate";
import { createFlagSchema } from "../schemas/flagsSchema";

export const flagsRouter = express.Router();

flagsRouter.get("/", authenticate, getFlags);
flagsRouter.post(
  "/",
  authenticate,
  requireAdmin,
  validateReqBody(createFlagSchema),
  createFlag,
);
