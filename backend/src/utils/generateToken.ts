import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

export const generateToken = (userId: number) => {
  const payload = { id: userId };
  const secret = process.env.JWT_SECRET_KEY as string;
  const expiresIn = (process.env.JWT_EXPIRES_IN || "7d") as StringValue;

  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
};
