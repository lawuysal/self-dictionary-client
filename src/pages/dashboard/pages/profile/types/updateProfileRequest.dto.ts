import { z } from "zod";

export const UpdateProfileRequestSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30).nullable(),
  bio: z.string().max(150).nullable(),
  photo: z.custom<File>().optional(),
  username: z.string().min(2).max(30).toLowerCase(),
  ownerId: z.string().uuid(),
});

export type UpdateProfileRequestDto = z.infer<
  typeof UpdateProfileRequestSchema
>;
