import { useQuery } from "@tanstack/react-query";
import { getAllNotesByUserIdApi } from "../api/getAllNotesByUserIdApi";
import { GetAllNotesByUserIdResponseDto } from "../types/getAllNotesByUserIdResponse.dto";

export function useGetAllNotesByUserId(
  userId: string,
  limit: number = 10,
  page: number = 1,
  sortBy: string = "createdAt",
  order: string = "asc",
  search: string = "",
) {
  return useQuery<GetAllNotesByUserIdResponseDto, Error>({
    enabled: !!localStorage.getItem("token"),
    queryKey: [
      "getAllNotesByUserId",
      userId,
      limit,
      page,
      sortBy,
      order,
      search,
    ],
    queryFn: () =>
      getAllNotesByUserIdApi(userId, limit, page, sortBy, order, search),
  });
}
