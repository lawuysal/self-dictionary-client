import { Note } from "@/types/entities/note.entity";

export interface GetNotesByLanguageIdResponseDto {
  notes: Note[];
  meta: {
    total: number;
    totalPages: number;
  };
}
