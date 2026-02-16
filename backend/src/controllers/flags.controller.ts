import { Request, Response } from "express";
import { db } from "../db";
import { flags } from "../db/schema";

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
