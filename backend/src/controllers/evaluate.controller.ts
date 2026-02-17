import type { Request, Response } from "express";

export const evaluate = async (req: Request, res: Response) => {
  res.send("evaluate controller called");
};
