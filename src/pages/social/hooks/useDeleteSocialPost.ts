import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteSocialPostApi } from "../api/deleteSocialPostApi";
import { toast } from "sonner";

export function useDeleteSocialPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteSocialPost"],
    mutationFn: (socialPostId: string) => deleteSocialPostApi(socialPostId),
    onSuccess: () => {
      toast.warning("Post deleted!");

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
