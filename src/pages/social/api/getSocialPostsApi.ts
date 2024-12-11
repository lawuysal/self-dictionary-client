import { Endpoints } from "@/api/endpoints";
import { GetSocialPostResponse } from "@/types/dtos/GetSocialPostResponse.dto";
import { PostType } from "../enum/postType";

export async function getSocialPostsApi(
  page: number,
  type: PostType,
  username: string = "",
) {
  return await fetch(Endpoints.SOCIAL_POSTS_PAGINATION(page, type, username), {
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
