import { useQuery } from "@tanstack/react-query";
import { GetFollowersResponseDto } from "../types/getFollowersResponse.dto";
import { getFollowersApi } from "../api/getFollowersApi";

export function useGetFollowers(userId: string) {
  return useQuery<GetFollowersResponseDto, Error>({
    enabled: !!localStorage.getItem("token") && !!userId,
    queryKey: ["getFollowers", userId],
    queryFn: () => getFollowersApi(userId),
    retry: 0,
  });
}
