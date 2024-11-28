import { useQuery } from "@tanstack/react-query";
import { getLanguagesByUserIdApi } from "../api/getLanguagesByUserIdApi";
import { Language } from "../../../../../types/entities/language.entity";

export function useGetLanguagesByUserId(userId: string) {
  return useQuery<Language[], Error>({
    enabled: !!localStorage.getItem("token"),
    queryKey: ["getLanguages"],
    queryFn: () => getLanguagesByUserIdApi(userId),
  });
}
