import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export const validateReqBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));

      return res.status(400).json({ success: false, errors });
    }

    req.body = result.data;
    next();
  };
};
