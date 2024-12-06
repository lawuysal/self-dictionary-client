import { Endpoints } from "@/api/endpoints";
import { GetAllNotesByUserIdResponseDto } from "../types/getAllNotesByUserIdResponse.dto";

export async function getAllNotesByUserIdApi(
  userId: string,
  limit: number = 10,
  page: number = 1,
  sortBy: string = "createdAt",
  order: string = "asc",
  search: string = "",
) {
  return await fetch(
    Endpoints.NOTES_BY_USER_ID(userId, limit, page, sortBy, order, search),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch notes");
      }
      return res.json();
    })
    .then((data) => data as GetAllNotesByUserIdResponseDto)
    .catch((error) => {
      throw error;
    });
}
