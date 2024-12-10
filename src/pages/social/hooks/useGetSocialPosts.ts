import { useInfiniteQuery } from "@tanstack/react-query";
import { getSocialPostsApi } from "../api/getSocialPostsApi";
import { GetSocialPostResponse } from "@/types/dtos/GetSocialPostResponse.dto";
import { PostType } from "../enum/postType";

export function useGetSocialPosts(type: PostType) {
  return useInfiniteQuery<GetSocialPostResponse[], Error>({
    enabled: !!localStorage.getItem("token"),
    queryKey: ["getAllSocialPosts", type],
    queryFn: ({ pageParam }) => getSocialPostsApi(pageParam as number, type),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 3) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
}
