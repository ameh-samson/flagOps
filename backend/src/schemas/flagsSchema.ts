import * as z from "zod";

export const createFlagSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    environment: z.enum(["development", "staging", "production"]),
    defaultState: z.boolean().optional(),
    rolloutPercentage: z.number().min(0).max(100),
  })
  .strict();

export const updateFlagSchema = z
  .object({
    description: z.string().optional(),
    defaultState: z.boolean().optional(),
    rolloutPercentage: z.number().min(0).max(100).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
