import { useParams } from "react-router-dom";
import { useGetSocialProfile } from "../../hooks/useGetSocialProfile";
import { Endpoints } from "@/api/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { ProfileActionButton } from "./components/ProfileActionButton";
import UserFollowersList from "./components/UserFollowersList";
import { getAvatarFallbackText } from "@/util/getAvatarFallbackText";
import UserFollowedUsersList from "./components/UserFollowedUsersList";

export default function SocialProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { data: userProfile, isLoading } = useGetSocialProfile(username!);
  const { username: loggedInUsername } = useSelector(
    (state: RootState) => state.userProfile,
  );

  if (!userProfile || isLoading || !username || !loggedInUsername) {
    return;
  }

  return (
    <div className="flex w-full flex-col rounded-lg border p-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between">
          <a
            href={Endpoints.GET_IMAGE(userProfile.photoUrl || "")}
            target="_blank"
          >
            <Avatar className="size-32 border">
              <AvatarImage
                src={Endpoints.GET_IMAGE(userProfile.photoUrl || "")}
                alt={`${userProfile.firstName} ${userProfile.lastName} profile picture`}
              />
              <AvatarFallback>
                {getAvatarFallbackText(
                  userProfile.firstName,
                  userProfile.lastName,
                )}
              </AvatarFallback>
            </Avatar>
          </a>
          <ProfileActionButton
            loggedInUsername={loggedInUsername}
            profileUsername={username}
            profileOwnerId={userProfile.ownerId}
          />
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
          <UserFollowedUsersList
            userId={userProfile.ownerId}
            followedUsersCount={userProfile.owner._count.followedBy}
          />
          <UserFollowersList
            userId={userProfile.ownerId}
            followerCount={userProfile.owner._count.following}
          />
        </div>
      </div>
    </div>
  );
}
