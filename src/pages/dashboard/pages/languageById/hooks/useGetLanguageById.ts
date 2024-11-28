import { useQuery } from "@tanstack/react-query";
import { getLanguageByIdApi } from "../api/getLanguageByIdApi";
import { Language } from "@/types/entities/language.entity";

export function useGetLanguageById(languageId: string) {
  return useQuery<Language, Error>({
    enabled: !!localStorage.getItem("token"),
    queryKey: ["getLanguage", languageId],
    queryFn: () => getLanguageByIdApi(languageId),
  });
}
