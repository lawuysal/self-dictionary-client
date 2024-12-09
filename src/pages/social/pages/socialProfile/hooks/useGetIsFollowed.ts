import { useQuery } from "@tanstack/react-query";
import { isFollowedApi } from "../api/isFollowedApi";
import { FollowCheckOnUserResponse } from "@/pages/social/pages/socialProfile/types/followCheckOnUserResponse";

export function useGetIsFollowed(userId: string) {
  return useQuery<FollowCheckOnUserResponse, Error>({
    enabled: !!localStorage.getItem("token") && !!userId,
    queryKey: ["isFollowed", userId],
    queryFn: () => isFollowedApi(userId),
    retry: 0,
  });
}
