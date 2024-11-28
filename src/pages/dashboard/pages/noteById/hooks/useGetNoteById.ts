import { Note } from "@/types/entities/note.entity";
import { useQuery } from "@tanstack/react-query";
import { getNoteByIdApi } from "../api/getNoteById";

export function useGetNoteById(noteId: string) {
  return useQuery<Note, Error>({
    enabled: !!localStorage.getItem("token"),
    queryKey: ["getNote", noteId],
    queryFn: () => getNoteByIdApi(noteId),
  });
}
