import { Endpoints } from "@/api/endpoints";
import { Language } from "../../../../../types/entities/language.entity";
import { CreateLanguageRequest } from "../types/createLanguageRequest.dto";

export async function createLanguageApi(data: CreateLanguageRequest) {
  return await fetch(Endpoints.LANGUAGES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Language creation failed");
      }
      return res.json();
    })
    .then((data) => data as Language)
    .catch((error) => {
      throw error;
    });
}
