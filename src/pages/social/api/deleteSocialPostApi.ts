import { Endpoints } from "@/api/endpoints";

export async function deleteSocialPostApi(socialPostId: string) {
  return await fetch(Endpoints.SOCIAL_POST_BY_ID(socialPostId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete social post");
      }
      return res.json();
    })
    .then((data) => data)
    .catch((error) => {
      throw error;
    });
}
