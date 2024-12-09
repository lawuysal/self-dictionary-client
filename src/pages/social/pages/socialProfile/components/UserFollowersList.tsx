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
import { useGetFollowers } from "../hooks/useGetFollowers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLink } from "react-router-dom";
import ROUTES from "@/routes/Routes.enum";

function UserFollowersList({
  userId,
  followerCount,
}: {
  userId: string;
  followerCount: number;
}) {
  const { data: followers, isLoading } = useGetFollowers(userId);

  if (isLoading) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <p className="cursor-pointer hover:underline">
          <span className="text-base font-semibold text-foreground">
            {followerCount}
          </span>{" "}
          followers
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Followers ({followers?.length || "0"})</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72">
          <div className="flex flex-col gap-3">
            {followers &&
              followers.map((follower) => (
                <DialogClose asChild>
                  <NavLink
                    to={ROUTES.SOCIAL_PROFILE_BY_USERNAME_GEN(
                      follower.username,
                    )}
                  >
                    <MiniUserCard key={follower.id} {...follower} />
                  </NavLink>
                </DialogClose>
              ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default UserFollowersList;
