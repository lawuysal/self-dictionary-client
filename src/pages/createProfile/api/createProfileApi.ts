import { Endpoints } from "@/api/endpoints";
import { CreateProfileRequest } from "../types/createProfileRequest.type";
import { Profile } from "@/types/entities/profile.entity";

export async function createProfileApi(data: CreateProfileRequest) {
  return await fetch(Endpoints.PROFILES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Profile creation failed");
      }
      return res.json();
    })
    .then((data) => data as Profile)
    .catch((error) => {
      throw error;
    });
}
