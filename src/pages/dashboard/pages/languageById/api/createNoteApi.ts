import { Endpoints } from "@/api/endpoints";
import { CreateNoteRequestDto } from "../types/createNoteRequest.dto";
import { Note } from "@/types/entities/note.entity";

export async function createNoteApi(noteData: CreateNoteRequestDto) {
  return await fetch(Endpoints.NOTES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(noteData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to create note");
      }
      return res.json();
    })
    .then((data) => data as Note)
    .catch((error) => {
      throw error;
    });
}
