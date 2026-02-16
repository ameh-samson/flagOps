import * as z from "zod";

export const createFlagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  environment: z.enum(["development", "staging", "production"]),
  rolloutPercentage: z.number().min(0).max(100),
});
