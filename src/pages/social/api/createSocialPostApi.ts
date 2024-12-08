import { Endpoints } from "@/api/endpoints";
import { GetSocialPostResponse } from "@/types/dtos/GetSocialPostResponse.dto";
import { CreateSocialPostRequestDto } from "../types/createSocialPostRequest.dto";

export async function createSocialPostApi(
  postData: CreateSocialPostRequestDto,
) {
  return await fetch(Endpoints.SOCIAL_POSTS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(postData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to create the post");
      }
      return res.json();
    })
    .then((data) => data as GetSocialPostResponse)
    .catch((error) => {
      throw error;
    });
}
