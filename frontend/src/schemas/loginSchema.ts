import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string("Invalid email address")
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
