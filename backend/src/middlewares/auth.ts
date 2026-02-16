import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Please sign in to access this resource" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id: string;
    };

    (req as any).userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "You are not authenticated" });
  }
};
