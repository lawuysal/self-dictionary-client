import { Endpoints } from "@/api/endpoints";
import { CreatePreferenceRequest } from "../types/createPreferenceRequest.type";
import { Preference } from "@/types/entities/preference.entity";

export async function createPreferenceApi(data: CreatePreferenceRequest) {
  return await fetch(Endpoints.PREFERENCES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Preference creation failed");
      }
      return res.json();
    })
    .then((data) => data as Preference)
    .catch((error) => {
      throw error;
    });
}
