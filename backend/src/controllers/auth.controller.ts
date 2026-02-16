import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    const user = existingUser[0];
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const existingUsers = await db.select().from(users);

    const role = existingUsers.length === 0 ? "admin" : "user";

    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        passwordHash,
        role,
      })
      .returning();

    if (!newUser) {
      return res.status(500).json({ error: "Failed to register user" });
    }

    const token = generateToken(newUser.id, res);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    const user = existingUser[0];
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = generateToken(user.id, res);

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
