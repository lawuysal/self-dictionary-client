import { z } from "zod";

export const SignupUserRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must be at most 30 characters long"),
});

export type SignupUserRequest = z.infer<typeof SignupUserRequestSchema>;
