import { Endpoints } from "@/api/endpoints";
import { GetNotesByLanguageIdResponseDto } from "../types/getNotesByLanguageIdResponse.dto";
import { ApiError } from "@/types/ApiError";

export async function getNotesByLanguageIdApi(
  languageId: string,
  limit: number = 10,
  page: number = 1,
) {
  return await fetch(
    Endpoints.NOTES_BY_LANGUAGE_ID(languageId, { limit, page }),
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
