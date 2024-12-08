export type Profile = {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  ownerId: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  photoUrl: string | null;
  username: string | null;
  owner: {
    _count: {
      following: number;
      followedBy: number;
    };
  };
};
