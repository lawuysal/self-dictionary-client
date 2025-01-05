import { Endpoints } from "@/api/endpoints";
import { Preference } from "@/types/entities/preference.entity";

export async function postUpdatePreferencesApi(
  theme: string,
  language: string,
  ownerId: string,
) {
  return await fetch(Endpoints.PREFERENCES, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ theme, language, ownerId }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update preferences");
      }
      return res.json();
    })
    .then((data) => data as Preference)
    .catch((error) => {
      throw error;
    });
}
