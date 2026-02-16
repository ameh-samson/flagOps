import { Request, Response } from "express";
import { db } from "../db";
import { flags } from "../db/schema";

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

export const createFlag = async (req: Request, res: Response) => {
  const { name, description, environment, rolloutPercentage } = req.body;

  const userId = (req as any).userId;

  try {
    const [newFlag] = await db
      .insert(flags)
      .values({
        name,
        description,
        environment,
        defaultState: false,
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
      data: {
        flag: {
          id: newFlag.id,
          name: newFlag.name,
          description: newFlag.description,
          environment: newFlag.environment,
          defaultState: newFlag.defaultState,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
