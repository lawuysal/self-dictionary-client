import { Endpoints } from "@/api/endpoints";
import { RemoveFollowResponse } from "../types/removeFollowResponse";

export async function removeFollowApi(userId: string) {
  const currentUserId = localStorage.getItem("userId") as string;

  return await fetch(Endpoints.REMOVE_FOLLOW, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ followingId: userId, followedById: currentUserId }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch follow state ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => data as RemoveFollowResponse)
    .catch((error) => {
      throw error;
    });
}
