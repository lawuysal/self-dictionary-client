import { Endpoints } from "@/api/endpoints";
import { GetSocialPostResponse } from "@/types/dtos/GetSocialPostResponse.dto";
import { RemovePositiveActionFromPostDto } from "../types/removePositiveActionFromPost.dto";

export async function removePositiveActionFromPostApi(
  postData: RemovePositiveActionFromPostDto,
) {
  return await fetch(Endpoints.SOCIAL_POST_REMOVE_POSITIVE_ACTION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(postData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to remove positive action from the post");
      }
      return res.json();
    })
    .then((data) => data as GetSocialPostResponse)
    .catch((error) => {
      throw error;
    });
}
