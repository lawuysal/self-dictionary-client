import { Button } from "@/components/ui/button";
import ROUTES from "@/routes/Routes.enum";
import { NavLink } from "react-router-dom";
import { useRemoveFollow } from "../hooks/useRemoveFollow";
import { useAddFollow } from "../hooks/useAddFollow";
import { useGetIsFollowed } from "../hooks/useGetIsFollowed";

export function ProfileActionButton({
  profileUsername,
  loggedInUsername,
  profileOwnerId,
}: {
  profileUsername: string;
  loggedInUsername: string;
  profileOwnerId: string;
}) {
  const { data: isFollowedData } = useGetIsFollowed(profileOwnerId);
  const addFollowMutation = useAddFollow();
  const removeFollowMutation = useRemoveFollow();

  if (
    profileUsername.toLocaleLowerCase() === loggedInUsername.toLocaleLowerCase()
  ) {
    return (
      <NavLink to={ROUTES.PROFILE}>
        <Button variant="outline">Edit Profile</Button>
      </NavLink>
    );
  }

  if (isFollowedData) {
    if (isFollowedData.isFollowed == true) {
      return (
        <Button
          variant="outline"
          onClick={() => removeFollowMutation.mutate(profileOwnerId)}
          disabled={removeFollowMutation.isPending}
        >
          Unfollow
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => addFollowMutation.mutate(profileOwnerId)}
          disabled={addFollowMutation.isPending}
        >
          Follow
        </Button>
      );
    }
  }

  return;
}
