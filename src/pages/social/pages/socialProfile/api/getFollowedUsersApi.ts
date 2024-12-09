import { Endpoints } from "@/api/endpoints";
import { GetFollowedUsersResponseDto } from "../types/getFollowedUsersResponse.dto";

export async function getFollowedUsersApi(userId: string) {
  return await fetch(Endpoints.GET_FOLLOWED_USERS_BY_USER_ID(userId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Failed to fetch followed users state ${res.statusText}`,
        );
      }
      return res.json();
    })
    .then((data) => data as GetFollowedUsersResponseDto)
    .catch((error) => {
      throw error;
    });
}
