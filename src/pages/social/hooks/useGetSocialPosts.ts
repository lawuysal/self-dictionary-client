import { useQuery } from "@tanstack/react-query";
import { getSocialPostsApi } from "../api/getSocialPostsApi";
import { GetSocialPostResponse } from "@/types/dtos/GetSocialPostResponse.dto";

export function useGetSocialPosts() {
  return useQuery<GetSocialPostResponse[], Error>({
    enabled: !!localStorage.getItem("token"),
    queryKey: ["getAllSocialPosts"],
    queryFn: () => getSocialPostsApi(),
  });
}
