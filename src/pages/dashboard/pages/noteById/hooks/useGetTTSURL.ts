import { useMutation } from "@tanstack/react-query";
import { getTTSURLApi } from "../api/getTTSURLApi";

export function useGetTTSURL(text: string, language: string, speed: number) {
  return useMutation({
    mutationKey: ["updatenote", text, language, speed],
    mutationFn: () => getTTSURLApi({ language, text, speed }),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      throw error;
    },
  });
}
