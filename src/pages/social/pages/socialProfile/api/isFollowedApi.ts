import { Endpoints } from "@/api/endpoints";
import { FollowCheckOnUserResponse } from "@/pages/social/pages/socialProfile/types/followCheckOnUserResponse";

export async function isFollowedApi(userId: string) {
  const currentUserId = localStorage.getItem("userId") as string;

  return await fetch(Endpoints.IS_FOLLOWED, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ followingId: userId, followedById: currentUserId }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch follow state");
      }
      return res.json();
    })
    .then((data) => data as FollowCheckOnUserResponse)
    .catch((error) => {
      throw error;
    });
}
