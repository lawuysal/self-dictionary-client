import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddPositiveActionOnPostDto } from "../types/addPositiveActionOnPost.dto";
import { addPositiveActionOnPostApi } from "../api/addPositiveActionOnPostApi";

export function useAddPositiveActionOnPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addPositiveActionOnPost"],
    mutationFn: (postData: AddPositiveActionOnPostDto) =>
      addPositiveActionOnPostApi(postData),
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
