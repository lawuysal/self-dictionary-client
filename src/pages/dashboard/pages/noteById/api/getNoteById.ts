import { Endpoints } from "@/api/endpoints";
import { Note } from "@/types/entities/note.entity";

export async function getNoteByIdApi(data: string) {
  return await fetch(Endpoints.NOTE_BY_ID(data), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch note");
      }
      return res.json();
    })
    .then((data) => data as Note)
    .catch((error) => {
      throw error;
    });
}
