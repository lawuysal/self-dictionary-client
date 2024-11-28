import { Endpoints } from "@/api/endpoints";
import { Note } from "@/types/entities/note.entity";

export async function getAllNotesByUserIdApi(userId: string) {
  return await fetch(Endpoints.NOTES_BY_USER_ID(userId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch notes");
      }
      return res.json();
    })
    .then((data) => data as Note[])
    .catch((error) => {
      throw error;
    });
}
