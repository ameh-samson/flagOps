import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string("Invalid email address")
    .min(1, { message: "Email is required" }),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/,
      "Password must contain at least one letter, one number, and one special character",
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
