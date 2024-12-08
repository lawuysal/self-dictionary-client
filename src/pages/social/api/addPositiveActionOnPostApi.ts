import { Endpoints } from "@/api/endpoints";
import { AddPositiveActionOnPostDto } from "../types/addPositiveActionOnPost.dto";
import { GetSocialPostResponse } from "@/types/dtos/GetSocialPostResponse.dto";

export async function addPositiveActionOnPostApi(
  postData: AddPositiveActionOnPostDto,
) {
  return await fetch(Endpoints.SOCIAL_POST_ADD_POSITIVE_ACTION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(postData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add positive action on the post");
      }
      return res.json();
    })
    .then((data) => data as GetSocialPostResponse)
    .catch((error) => {
      throw error;
    });
}
