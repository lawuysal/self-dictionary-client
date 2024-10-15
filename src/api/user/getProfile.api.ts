import { Endpoints } from "@/api/endpoints";
import { Profile } from "@/types/entities/profile.entity";

export async function getProfileApi() {
  const userId = localStorage.getItem("userId");

  return await fetch(`${Endpoints.PROFILES}/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Profile not found");
      }
      return res.json();
    })
    .then((data) => data as Profile)
    .catch((error) => {
      throw error;
    });
}
