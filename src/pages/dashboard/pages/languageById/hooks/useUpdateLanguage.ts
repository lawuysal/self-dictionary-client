import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateLanguageRequestDto } from "../types/updateLanguageRequest.dto";
import { updateLanguageApi } from "../api/updateLanguageApi";

export function useUpdateLanguage(languageId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateLanguage, languageId"],
    mutationFn: (languageData: UpdateLanguageRequestDto) =>
      updateLanguageApi(languageId, languageData),
    onSuccess: () => {
      toast({
        title: "Language updated successfully",
        description: "Your language has been updated successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: ["getLanguages"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["getLanguage"],
        exact: false,
      });
    },
    onError: (error) => {
      toast({
        title: "Language update failed",
        description: `${error.message}`,
        variant: "destructive",
      });
      throw error;
    },
  });
}
