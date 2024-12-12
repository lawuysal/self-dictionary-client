import { Endpoints } from "@/api/endpoints";
import { GetLanguageNoteCountsResponse } from "../types/getLanguageNoteCountsResponse.dto";

export async function getLanguageNoteCountByIdApi(languageId: string) {
  return await fetch(Endpoints.LANGUAGE_NOTE_COUNT_BY_ID(languageId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch language note counts");
      }
      return res.json();
    })
    .then((data) => data as GetLanguageNoteCountsResponse)
    .catch((error) => {
      throw error;
    });
}
