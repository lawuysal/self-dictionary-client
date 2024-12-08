import { z } from "zod";

export const AddPositiveActionOnPostSchema = z.object({
  socialPostId: z.string().uuid(),
  userId: z.string().uuid(),
});

export type AddPositiveActionOnPostDto = z.infer<
  typeof AddPositiveActionOnPostSchema
>;
