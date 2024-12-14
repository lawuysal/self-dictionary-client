import { useQuery } from "@tanstack/react-query";
import { GetLanguageNoteCountsResponse } from "../types/getLanguageNoteCountsResponse.dto";
import { getLanguageNoteCountByIdApi } from "../api/getLanguageNoteCountByIdApi";

export function useGetLanguageNoteCountsById(languageId: string) {
  return useQuery<GetLanguageNoteCountsResponse, Error>({
    enabled: !!localStorage.getItem("token"),
    queryKey: ["getLanguageNoteCountsById", languageId],
    queryFn: () => getLanguageNoteCountByIdApi(languageId),
    retry: 0,
  });
}
