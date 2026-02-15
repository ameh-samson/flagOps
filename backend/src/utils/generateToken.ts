import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import type { Response } from "express";

export const generateToken = (userId: number, res: Response) => {
  const payload = { id: userId };
  const secret = process.env.JWT_SECRET_KEY as string;
  const expiresIn = (process.env.JWT_EXPIRES_IN || "1h") as StringValue;

  const token = jwt.sign(payload, secret, { expiresIn });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60,
  });
  return token;
};
