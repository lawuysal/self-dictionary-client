import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeFollowApi } from "../api/removeFollowApi";

export function useRemoveFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["removeFollow"],
    mutationFn: (userId: string) => removeFollowApi(userId),
    onSuccess: (data) => {
      toast.info("Unfollowed");

      queryClient.invalidateQueries({
        queryKey: ["isFollowed", data.unfollowedUserId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["getSocialProfile"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["getFollowers", data.unfollowedUserId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["getFollowedUsers", data.unfollowerUserId],
        exact: true,
      });
    },
    onError: (error) => {
      throw error;
    },
  });
}
