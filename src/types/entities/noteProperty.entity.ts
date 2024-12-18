import { Note } from "./note.entity";

export interface NoteProperty {
  id: string;
  name: string;
  description: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  note: Note;
  noteId: string;
}
