import { NavLink, useParams } from "react-router-dom";
import { useGetSocialProfile } from "../../hooks/useGetSocialProfile";
import { Endpoints } from "@/api/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import ROUTES from "@/routes/Routes.enum";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useGetIsFollowed } from "../../hooks/useGetIsFollowed";

export default function SocialProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { data: userProfile, isLoading } = useGetSocialProfile(username!);
  const { username: loggedInUsername } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data: isFollowedData } = useGetIsFollowed(userProfile?.ownerId || "");

  function handleActionButton() {
    if (
      username?.toLocaleLowerCase() === loggedInUsername?.toLocaleLowerCase()
    ) {
      return (
        <NavLink to={ROUTES.PROFILE}>
          <Button variant="outline">Edit Profile</Button>
        </NavLink>
      );
    }

    if (isFollowedData) {
      if (isFollowedData.isFollowed == true) {
        return <Button variant="outline">Unfollow</Button>;
      } else {
        return <Button>Follow</Button>;
      }
    }

    return;
  }

  if (!userProfile || !isFollowedData || isLoading) {
    return;
  }

  return (
    <div className="flex w-full flex-col rounded-lg border p-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between">
          <Avatar className="size-32 border">
            <AvatarImage
              src={`${Endpoints.STATIC_URL}/${userProfile.photoUrl}`}
              alt={`${userProfile.firstName} ${userProfile.lastName} profile picture`}
            />
            <AvatarFallback>{`${userProfile.firstName}`}</AvatarFallback>
          </Avatar>
          {handleActionButton()}
        </div>
        <div>
          <h2 className="text-xl font-bold">
            {userProfile.firstName} {userProfile.lastName}
          </h2>
          <p className="text-muted-foreground">@{userProfile.username}</p>
        </div>
        <p>{userProfile.bio}</p>
        <p className="flex items-center text-sm text-muted-foreground">
          <span>
            <CalendarDays className="mr-2 size-4" />
          </span>
          Joined {new Date(userProfile.createdAt).toLocaleDateString()}
        </p>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <p className="cursor-pointer hover:underline">
            <span className="font text-base font-semibold text-foreground">
              {userProfile.owner._count.following}
            </span>{" "}
            following
          </p>
          <p className="cursor-pointer hover:underline">
            <span className="text-base font-semibold text-foreground">
              {userProfile.owner._count.followedBy}
            </span>{" "}
            followers
          </p>
        </div>
      </div>
    </div>
  );
}
