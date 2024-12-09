import { useQuery } from "@tanstack/react-query";
import { GetFollowedUsersResponseDto } from "../types/getFollowedUsersResponse.dto";
import { getFollowedUsersApi } from "../api/getFollowedUsersApi";

export function useGetFollowedUsers(userId: string) {
  return useQuery<GetFollowedUsersResponseDto, Error>({
    enabled: !!localStorage.getItem("token") && !!userId,
    queryKey: ["getFollowedUsers", userId],
    queryFn: () => getFollowedUsersApi(userId),
    retry: 0,
  });
}
