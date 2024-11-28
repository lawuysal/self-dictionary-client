import { Note } from "@/types/entities/note.entity";
import { useQuery } from "@tanstack/react-query";
import { getAllNotesByUserIdApi } from "../api/getAllNotesByUserIdApi";

export function useGetAllNotesByUserId(userId: string) {
  return useQuery<Note[], Error>({
    enabled: !!localStorage.getItem("token"),
    queryKey: ["getAllNotesByUserId"],
    queryFn: () => getAllNotesByUserIdApi(userId),
  });
}
