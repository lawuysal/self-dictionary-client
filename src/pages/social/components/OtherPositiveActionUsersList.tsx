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

type OtherPositiveActionUsersListProps = {
  userId: string;
  userFirstName: string;
  userLastName: string;
  userUsername: string;
  userPhotoUrl: string;
  positiveActionAt: string;
}[];

function OtherPositiveActionUsersList({
  positiveActionUsers,
}: {
  positiveActionUsers: OtherPositiveActionUsersListProps;
}) {
  return (
    <Dialog>
      <DialogTrigger className="hover:text-foreground">
        <p className="cursor-pointer">{positiveActionUsers.length - 1} other</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            People supported this post ({positiveActionUsers?.length || "0"})
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72">
          <div className="flex flex-col gap-3">
            {positiveActionUsers &&
              positiveActionUsers.map((positiveActionUser) => (
                <DialogClose
                  asChild
                  key={
                    positiveActionUser.userId + "otherPositiveActionUsersList"
                  }
                >
                  <NavLink
                    to={ROUTES.SOCIAL_PROFILE_BY_USERNAME_GEN(
                      positiveActionUser.userUsername,
                    )}
                  >
                    <MiniUserCard
                      key={positiveActionUser.userId}
                      firstName={positiveActionUser.userFirstName}
                      lastName={positiveActionUser.userLastName}
                      username={positiveActionUser.userUsername}
                      photoUrl={positiveActionUser.userPhotoUrl}
                      id={positiveActionUser.userId}
                    />
                  </NavLink>
                </DialogClose>
              ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default OtherPositiveActionUsersList;
