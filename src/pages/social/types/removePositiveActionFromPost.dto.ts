import { z } from "zod";

export const RemovePositiveActionFromPostSchema = z.object({
  socialPostId: z.string().uuid(),
  userId: z.string().uuid(),
});

export type RemovePositiveActionFromPostDto = z.infer<
  typeof RemovePositiveActionFromPostSchema
>;
