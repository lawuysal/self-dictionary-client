import { Endpoints } from "@/api/endpoints";
import { GetSocialPostResponse } from "@/types/dtos/GetSocialPostResponse.dto";

export async function getSocialPostsApi() {
  return await fetch(Endpoints.SOCIAL_POSTS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      return res.json();
    })
    .then((data) => data as GetSocialPostResponse[])
    .catch((error) => {
      throw error;
    });
}
