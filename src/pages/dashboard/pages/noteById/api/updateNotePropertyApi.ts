import { Endpoints } from "@/api/endpoints";
import { NoteProperty } from "@/types/entities/noteProperty.entity";
import { UpdateNotePropertyRequestDto } from "../types/updateNotePropertyRequest.dto";

export async function updateNotePropertyApi(
  notePropertyData: UpdateNotePropertyRequestDto,
) {
  return await fetch(Endpoints.UPDATE_NOTE_PROPERTY, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(notePropertyData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update note property");
      }
      return res.json();
    })
    .then((data) => data as NoteProperty)
    .catch((error) => {
      throw error;
    });
}
