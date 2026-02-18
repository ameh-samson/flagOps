import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envProduction } from "../utils/envProduction.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. Invalid token format." });
    }

    const decoded = jwt.verify(token, envProduction.JWT_SECRET, {
      algorithms: ["HS256"],
    }) as jwt.JwtPayload;

    if (!decoded.id) {
      return res.status(401).json({ error: "Invalid token structure" });
    }

    (req as any).userId = decoded.id;
    next();
  } catch (error) {
    const message =
      error instanceof jwt.TokenExpiredError
        ? "Token expired"
        : "Invalid token";
    return res.status(401).json({ error: message });
  }
};
