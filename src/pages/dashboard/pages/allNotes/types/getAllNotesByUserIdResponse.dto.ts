import { Note } from "@/types/entities/note.entity";

export interface GetAllNotesByUserIdResponseDto {
  notes: Note[];
  meta: {
    total: number;
    totalPages: number;
    totalCount: number;
  };
}
