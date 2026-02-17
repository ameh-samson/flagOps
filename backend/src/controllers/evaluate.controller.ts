import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { eq, and } from "drizzle-orm";
import { flags } from "../db/schema/index.js";
import type { EvaluateRequestParams } from "../types/index.js";
import crypto from "crypto";

export const evaluate = async (req: Request, res: Response) => {
  try {
    const { flag, environment } = req.query as EvaluateRequestParams;
    const userId = (req as any).userId;

    let query = [];

    if (flag) {
      query.push(eq(flags.name, flag));
    }
    if (environment) {
      query.push(eq(flags.environment, environment));
    }

    const [featureFlag] = await db
      .select()
      .from(flags)
      .where(and(...query));

    if (!featureFlag) {
      return res.status(404).json({ error: "Flag not found" });
    }

    let enabled = false;

    if (featureFlag.defaultState === false) {
      enabled = false;
    } else if (featureFlag.rolloutPercentage === 0) {
      enabled = featureFlag.defaultState;
    } else if (featureFlag.rolloutPercentage === 100) {
      enabled = true;
    }
    // Else apply deterministic rollout
    else {
      const hash = crypto
        .createHash("sha256")
        .update(String(userId))
        .digest("hex");
      const hashNumber = parseInt(hash.substring(0, 8), 16);
      const result = hashNumber % 100;
      enabled = result < featureFlag.rolloutPercentage;
    }

    res.status(200).json({
      status: "success",
      enabled,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
