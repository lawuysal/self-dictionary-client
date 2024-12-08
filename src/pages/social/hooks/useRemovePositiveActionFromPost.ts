import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePositiveActionFromPostApi } from "../api/removePositiveActionFromPostApi";
import { RemovePositiveActionFromPostDto } from "../types/removePositiveActionFromPost.dto";

export function useRemovePositiveActionFromPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["removePositiveActionFromPost"],
    mutationFn: (postData: RemovePositiveActionFromPostDto) =>
      removePositiveActionFromPostApi(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllSocialPosts"],
        exact: false,
      });
    },
    onError: (error) => {
      throw error;
    },
  });
}
