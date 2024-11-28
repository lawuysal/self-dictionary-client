import { Endpoints } from "@/api/endpoints";
import { UpdateLanguageRequestDto } from "../types/updateLanguageRequest.dto";
import { Language } from "@/types/entities/language.entity";

export async function updateLanguageApi(
  languageId: string,
  languageData: UpdateLanguageRequestDto,
) {
  return await fetch(Endpoints.LANGUAGE_BY_ID(languageId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(languageData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update language");
      }
      return res.json();
    })
    .then((data) => data as Language)
    .catch((error) => {
      throw error;
    });
}
