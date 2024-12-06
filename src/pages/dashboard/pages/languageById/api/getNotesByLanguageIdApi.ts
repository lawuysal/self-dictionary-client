import { Endpoints } from "@/api/endpoints";
import { GetNotesByLanguageIdResponseDto } from "../types/getNotesByLanguageIdResponse.dto";
import { ApiError } from "@/types/ApiError";

export async function getNotesByLanguageIdApi(
  languageId: string,
  limit: number = 10,
  page: number = 1,
  sortBy: string = "createdAt",
  order: string = "asc",
  search: string = "",
) {
  return await fetch(
    Endpoints.NOTES_BY_LANGUAGE_ID(
      languageId,
      limit,
      page,
      sortBy,
      order,
      search,
    ),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  )
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        const error: ApiError = new Error(
          errorData?.error || "Failed to fetch notes",
        );
        error.status = res.status;
        throw error;
      }
      return res.json();
    })
    .then((data) => data as GetNotesByLanguageIdResponseDto)
    .catch((error: ApiError) => {
      throw error;
    });
}
