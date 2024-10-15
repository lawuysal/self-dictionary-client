import { z } from "zod";

export const LoginUserResponsetSchema = z.object({
  token: z.string(),
  userId: z.string(),
  userEmail: z.string(),
  hasProfile: z.string(),
});

export type LoginUserResponse = z.infer<typeof LoginUserResponsetSchema>;
