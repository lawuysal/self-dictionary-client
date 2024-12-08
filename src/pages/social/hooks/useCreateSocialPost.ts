import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSocialPostRequestDto } from "../types/createSocialPostRequest.dto";
import { createSocialPostApi } from "../api/createSocialPostApi";
import { useToast } from "@/hooks/use-toast";

export function useCreateSocialPost() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createSocialPost"],
    mutationFn: (postData: CreateSocialPostRequestDto) =>
      createSocialPostApi(postData),
    onSuccess: () => {
      toast({
        title: "Post created!",
        description: "Your post has been successfully created.",
      });

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
