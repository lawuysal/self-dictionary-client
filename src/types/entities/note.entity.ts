export interface Note {
  id: string;
  name: string;
  description: string;
  translation: string;
  properties: string;
  intensity: number;
  isPublic: boolean;
  createdAt: Date;
  editedAt: Date;
  languageId: string;
}
