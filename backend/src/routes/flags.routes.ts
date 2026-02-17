import express, { type Router } from "express";
import { authenticate } from "../middlewares/auth";
import { requireAdmin } from "../middlewares/checkRole";
import { validateReqBody } from "../middlewares/validate";
import { createFlagSchema, updateFlagSchema } from "../schemas/flagsSchema";
import {
  createFlag,
  deleteFlag,
  getFlagById,
  getFlags,
  updateFlag,
} from "../controllers/flags.controller";

export const flagsRouter: Router = express.Router();

flagsRouter.get("/", authenticate, getFlags);
flagsRouter.get("/:id", authenticate, getFlagById);
flagsRouter.post(
  "/",
  authenticate,
  requireAdmin,
  validateReqBody(createFlagSchema),
  createFlag,
);
flagsRouter.put(
  "/:id",
  authenticate,
  requireAdmin,
  validateReqBody(updateFlagSchema),
  updateFlag,
);
flagsRouter.delete("/:id", authenticate, requireAdmin, deleteFlag);
