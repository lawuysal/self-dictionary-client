import { Endpoints } from "@/api/endpoints";
import { Profile } from "@/types/entities/profile.entity";

export async function updateProfileRequestApi(profileData: FormData) {
  return await fetch(Endpoints.PROFILES, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: profileData,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update profile");
      }
      return res.json();
    })
    .then((data) => data as Profile)
    .catch((error) => {
      throw error;
    });
}
