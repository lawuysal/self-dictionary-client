import { Endpoints } from "@/api/endpoints";
import { Profile } from "@/types/entities/profile.entity";

export async function getSocialProfileApi(username: string) {
  return await fetch(Endpoints.GET_PROFILE_BY_USERNAME(username), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch user profile");
      }
      return res.json();
    })
    .then((data) => data as Profile)
    .catch((error) => {
      throw error;
    });
}
