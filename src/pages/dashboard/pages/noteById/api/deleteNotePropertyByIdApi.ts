import { Endpoints } from "@/api/endpoints";
import { NoteProperty } from "@/types/entities/noteProperty.entity";

export async function deleteNotePropertyById(notePropertyId: string) {
  return await fetch(Endpoints.DELETE_NOTE_PROPERTY(notePropertyId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete note property");
      }
      return res.json();
    })
    .then((data) => data as NoteProperty)
    .catch((error) => {
      throw error;
    });
}
