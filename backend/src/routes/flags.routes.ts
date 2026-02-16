import express from "express";
import { authenticate } from "../middlewares/auth";
import { requireAdmin } from "../middlewares/checkRole";
import { validateReqBody } from "../middlewares/validate";
import { createFlagSchema } from "../schemas/flagsSchema";
import {
  createFlag,
  getFlagById,
  getFlags,
} from "../controllers/flags.controller";

export const flagsRouter = express.Router();

flagsRouter.get("/", authenticate, getFlags);
flagsRouter.get("/:id", authenticate, getFlagById);
flagsRouter.post(
  "/",
  authenticate,
  requireAdmin,
  validateReqBody(createFlagSchema),
  createFlag,
);
