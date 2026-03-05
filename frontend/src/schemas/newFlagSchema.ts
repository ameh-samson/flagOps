import { z } from "zod";

export const newFlagSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    environment: z.enum(["development", "staging", "production"]),
    defaultState: z.boolean().optional(),
    rolloutPercentage: z.number().min(0).max(100),
  })
  .strict();

export type NewFlagFormData = z.infer<typeof newFlagSchema>;
