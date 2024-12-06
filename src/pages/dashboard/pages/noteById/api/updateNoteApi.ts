import { Endpoints } from "@/api/endpoints";
import { UpdateNoteRequestDto } from "../types/updateNoteRequest.dto";
import { Note } from "@/types/entities/note.entity";

export async function updateNoteApi(
  noteId: string,
  noteData: UpdateNoteRequestDto,
) {
  return await fetch(Endpoints.NOTE_BY_ID(noteId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(noteData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update language");
      }
      return res.json();
    })
    .then((data) => data as Note)
    .catch((error) => {
      throw error;
    });
}
