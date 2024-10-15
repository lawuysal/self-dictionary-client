import { Endpoints } from "@/api/endpoints";
import { Preference } from "@/types/entities/preference.entity";

export async function getPreferenceApi() {
  const userId = localStorage.getItem("userId");

  return await fetch(`${Endpoints.PREFERENCES}/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Preference not found");
      }
      return res.json();
    })
    .then((data) => data as Preference)
    .catch((error) => {
      throw error;
    });
}
