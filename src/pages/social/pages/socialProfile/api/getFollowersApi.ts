import { Endpoints } from "@/api/endpoints";
import { GetFollowersResponseDto } from "../types/getFollowersResponse.dto";

export async function getFollowersApi(userId: string) {
  return await fetch(Endpoints.GET_FOLLOWERS_BY_USER_ID(userId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch followers state ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => data as GetFollowersResponseDto)
    .catch((error) => {
      throw error;
    });
}
