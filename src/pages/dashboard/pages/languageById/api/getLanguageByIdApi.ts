import { Endpoints } from "@/api/endpoints";
import { Language } from "@/types/entities/language.entity";

export async function getLanguageByIdApi(data: string) {
  return await fetch(Endpoints.LANGUAGE_BY_ID(data), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch language");
      }
      return res.json();
    })
    .then((data) => data as Language)
    .catch((error) => {
      throw error;
    });
}
