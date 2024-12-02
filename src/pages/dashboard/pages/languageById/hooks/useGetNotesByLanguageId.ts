import { useQuery } from "@tanstack/react-query";
import { getNotesByLanguageIdApi } from "../api/getNotesByLanguageIdApi";
import { GetNotesByLanguageIdResponseDto } from "../types/getNotesByLanguageIdResponse.dto";
import { ApiError } from "@/types/ApiError";

export function useGetNotesByLanguageId(
  languageId: string,
  limit: number = 10,
  page: number = 1,
  sortBy: string = "createdAt",
  order: string = "asc",
  search: string = "",
) {
  return useQuery<GetNotesByLanguageIdResponseDto, ApiError>({
    enabled: !!localStorage.getItem("token"),
    queryKey: [
      "getNotesByLanguageId",
      languageId,
      limit,
      page,
      sortBy,
      order,
      search,
    ],
    queryFn: () =>
      getNotesByLanguageIdApi(languageId, limit, page, sortBy, order, search),
    retry: 0,
  });
}
