import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MiniUserCard from "@/pages/social/components/MiniUserCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLink } from "react-router-dom";
import ROUTES from "@/routes/Routes.enum";
import { useGetFollowedUsers } from "../hooks/useGetFollowedUsers";

function UserFollowedUsersList({
  userId,
  followedUsersCount,
}: {
  userId: string;
  followedUsersCount: number;
}) {
  const { data: followedUsers, isLoading } = useGetFollowedUsers(userId);

  if (isLoading) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <p className="cursor-pointer hover:underline">
          <span className="text-base font-semibold text-foreground">
            {followedUsersCount}
          </span>{" "}
          following
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Following ({followedUsers?.length || "0"})</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72">
          <div className="flex flex-col gap-3">
            {followedUsers &&
              followedUsers.map((followedUser) => (
                <DialogClose
                  asChild
                  key={followedUser.id + "followedUsersListItem"}
                >
                  <NavLink
                    to={ROUTES.SOCIAL_PROFILE_BY_USERNAME_GEN(
                      followedUser.username,
                    )}
                  >
                    <MiniUserCard key={followedUser.id} {...followedUser} />
                  </NavLink>
                </DialogClose>
              ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default UserFollowedUsersList;
