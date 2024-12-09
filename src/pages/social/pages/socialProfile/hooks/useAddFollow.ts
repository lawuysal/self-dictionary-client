import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFollowApi } from "../api/addFollowApi";
import { toast } from "sonner";

export function useAddFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addFollow"],
    mutationFn: (userId: string) => addFollowApi(userId),
    onSuccess: (data) => {
      toast.success("Followed");

      queryClient.invalidateQueries({
        queryKey: ["isFollowed", data.followedUserId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["getSocialProfile"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["getFollowers", data.followedUserId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["getFollowedUsers", data.followerUserId],
        exact: true,
      });
    },
    onError: (error) => {
      throw error;
    },
  });
}
