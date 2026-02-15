import type { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { registerSchema } from "../types";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = registerSchema.parse(req.body);

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "user already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      email,
      passwordHash,
      role: "user",
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {};
