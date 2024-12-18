import { NoteProperty } from "./noteProperty.entity";

export interface Note {
  id: string;
  name: string;
  description: string;
  translation: string;
  properties: NoteProperty[];
  intensity: number;
  isPublic: boolean;
  createdAt: Date;
  editedAt: Date;
  languageId: string;
  language: {
    shadowLanguage: string;
    ownerId: string;
  };
}
