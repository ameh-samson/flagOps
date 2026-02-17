import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { flags } from "../db/schema/index.js";
import { eq } from "drizzle-orm";

export const getFlags = async (req: Request, res: Response) => {
  try {
    const allflags = await db.select().from(flags);

    if (!allflags || allflags.length === 0) {
      return res.status(404).json({ error: "No flags found" });
    }

    res.status(200).json({ status: "success", data: allflags });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFlagById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [flag] = await db
      .select()
      .from(flags)
      .where(eq(flags.id, id as string));

    if (!flag) {
      return res.status(404).json({ error: "Flag not found" });
    }

    res.status(200).json({ status: "success", data: flag });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createFlag = async (req: Request, res: Response) => {
  try {
    const { name, description, environment, rolloutPercentage, defaultState } =
      req.body;

    const userId = (req as any).userId;
    const defaultStateValue = defaultState ? defaultState : false;

    const [newFlag] = await db
      .insert(flags)
      .values({
        name,
        description,
        environment,
        defaultState: defaultStateValue,
        rolloutPercentage,
        createdBy: userId,
      })
      .returning();

    if (!newFlag) {
      return res.status(500).json({ error: "Failed to create flag" });
    }

    res.status(201).json({
      status: "success",
      message: "Flag created successfully",
      data: newFlag,
    });
  } catch (error: any) {
    if (error?.code === "23505" || error?.cause?.code === "23505") {
      return res.status(409).json({
        error: "Flag with this name already exists in this environment",
      });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateFlag = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { description, defaultState, rolloutPercentage } = req.body;

    const [updatedFlag] = await db
      .update(flags)
      .set({
        description,
        defaultState,
        rolloutPercentage,
      })
      .where(eq(flags.id, id as string))
      .returning();

    if (!updatedFlag) {
      return res.status(404).json({ error: "Flag not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Flag updated successfully",
      data: updatedFlag,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteFlag = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [deletedFlag] = await db
      .delete(flags)
      .where(eq(flags.id, id as string))
      .returning();

    if (!deletedFlag) {
      return res.status(404).json({ error: "Flag not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Flag deleted successfully",
      data: deletedFlag,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
