import jwt from "jsonwebtoken";
import type { Response } from "express";
import { envProduction } from "./envProduction.js";

export const generateToken = (userId: string, res: Response) => {
  const payload = { id: userId };
  const secret = envProduction.JWT_SECRET;
  const expiresIn = envProduction.JWT_EXPIRES_IN;

  const token = jwt.sign(payload, secret, { expiresIn });

  res.cookie("token", token, {
    httpOnly: true,
    secure: envProduction.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 15,
  });
  return token;
};
