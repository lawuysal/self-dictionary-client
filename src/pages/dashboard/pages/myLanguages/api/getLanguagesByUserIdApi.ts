import { Endpoints } from "@/api/endpoints";
import { Language } from "../types/language.entity";

export async function getLanguagesByUserIdApi(data: string) {
  return await fetch(Endpoints.LANGUAGES_BY_ID(data), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch languages");
      }
      return res.json();
    })
    .then((data) => data as Language[])
    .catch((error) => {
      throw error;
    });
}
