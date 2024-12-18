import { Endpoints } from "@/api/endpoints";
import { CreateNotePropertyRequestDto } from "../types/createNotePropertyRequest.dto";
import { NoteProperty } from "@/types/entities/noteProperty.entity";

export async function createNotePropertyApi(
  notePropertyData: CreateNotePropertyRequestDto,
) {
  return await fetch(Endpoints.CREATE_NOTE_PROPERTY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(notePropertyData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to create note property");
      }
      return res.json();
    })
    .then((data) => data as NoteProperty)
    .catch((error) => {
      throw error;
    });
}
