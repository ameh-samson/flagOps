import * as z from "zod";

export const evaluateQuerySchema = z.object({
  flag: z.string().min(1, "Flag name is required"),
  environment: z.enum(["development", "staging", "production"]),
});
