import { Endpoints } from "@/api/endpoints";

export async function getShadowLanguagesApi() {
  return await fetch(Endpoints.SHADOW_LANGUAGES, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch shadow languages");
      }
      return res.json();
    })
    .then((data) => data as { language: string; value: string }[])
    .catch((error) => {
      throw error;
    });
}
