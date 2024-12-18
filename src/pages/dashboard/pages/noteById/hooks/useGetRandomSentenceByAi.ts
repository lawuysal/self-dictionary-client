import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { getRandomSentenceRequestDto } from "../types/getRandomSentenceRequest.dto";
import { getRandomSentenceByAIApi } from "../api/getRandomSentenceByAIApi";

export function useGetRandomSentenceByAI() {
  return useMutation({
    mutationKey: ["getRandomSentenceByAI"],
    mutationFn: (data: getRandomSentenceRequestDto) =>
      getRandomSentenceByAIApi(data),
    onSuccess: () => {
      toast.success("Sentence generated.", {
        description: "Your sentence has been generated successfully.",
      });
    },
    onError: (error) => {
      toast.error("Sentence generating failed, try again.", {
        description: error.message,
      });
      throw error;
    },
  });
}
