import { z } from "zod";

export const CreateProfileRequestSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().max(30),
  bio: z.string().max(150),
  photoUrl: z.string().nullable(),
  username: z.string().min(2).max(30),
  ownerId: z.string().uuid(),
});

export type CreateProfileRequest = z.infer<typeof CreateProfileRequestSchema>;
