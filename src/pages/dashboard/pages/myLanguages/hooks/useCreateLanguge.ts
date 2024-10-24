import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLanguageApi } from "../api/createLanguageApi";
import { CreateLanguageRequest } from "../types/createLanguageRequest.dto";
import { useToast } from "@/hooks/use-toast";

export function useCreateLanguge() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createLanguage"],
    mutationFn: (languageData: CreateLanguageRequest) =>
      createLanguageApi(languageData),
    onSuccess: (data) => {
      toast({
        title: "Language created successfully",
        description: `Language ${data.name} created successfully`,
      });

      queryClient.invalidateQueries({
        queryKey: ["getLanguages"],
        exact: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Language creation failed",
        description: `${error.message}`,
        variant: "destructive",
      });
      throw error;
    },
  });
}
