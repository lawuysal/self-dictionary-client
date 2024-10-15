export type Profile = {
  id: string;
  updatedAt: Date | null;
  ownerId: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  photoUrl: string | null;
  username: string | null;
};
