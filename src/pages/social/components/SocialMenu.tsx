import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import ROUTES from "@/routes/Routes.enum";
import {
  ArrowUp,
  ClockArrowUp,
  Newspaper,
  Settings,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function SocialMenu() {
  const { currentPath } = useSelector((state: RootState) => state.navigation);
  const { username } = useSelector((state: RootState) => state.userProfile);

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border p-8">
      <NavLink to={ROUTES.LATEST_SOCIAL_POSTS}>
        <div
          className={cn(
            "flex items-center gap-4 rounded-lg p-2 transition-colors duration-100 ease-in hover:bg-muted",
            ROUTES.LATEST_SOCIAL_POSTS.split("/")[2] ===
              currentPath.split("/")[2]
              ? "bg-muted/70"
              : "bg-transparent",
          )}
        >
          <span>
            <ClockArrowUp />
          </span>
          <h3 className="text-lg">Latest Posts</h3>
        </div>
      </NavLink>
      <NavLink to={ROUTES.POSITIVE_ACTIONED_SOCIAL_POSTS}>
        <div
          className={cn(
            "flex items-center gap-4 rounded-lg p-2 transition-colors duration-100 ease-in hover:bg-muted",
            ROUTES.POSITIVE_ACTIONED_SOCIAL_POSTS.split("/")[2] ===
              currentPath.split("/")[2]
              ? "bg-muted/70"
              : "bg-transparent",
          )}
        >
          <span>
            <ArrowUp />
          </span>
          <h3 className="text-lg">Supported Posts</h3>
        </div>
      </NavLink>
      <NavLink to={ROUTES.MY_SOCIAL_POSTS}>
        <div
          className={cn(
            "flex items-center gap-4 rounded-lg p-2 transition-colors duration-100 ease-in hover:bg-muted",
            ROUTES.MY_SOCIAL_POSTS.split("/")[2] === currentPath.split("/")[2]
              ? "bg-muted/70"
              : "bg-transparent",
          )}
        >
          <span>
            <Newspaper />
          </span>
          <h3 className="text-lg">My Posts</h3>
        </div>
      </NavLink>
      <NavLink to={ROUTES.MY_FOLLOWINGS_SOCIAL_POSTS}>
        <div
          className={cn(
            "flex items-center gap-4 rounded-lg p-2 transition-colors duration-100 ease-in hover:bg-muted",
            ROUTES.MY_FOLLOWINGS_SOCIAL_POSTS.split("/")[2] ===
              currentPath.split("/")[2]
              ? "bg-muted/70"
              : "bg-transparent",
          )}
        >
          <span>
            <UsersRound />
          </span>
          <h3 className="text-lg">My Followings</h3>
        </div>
      </NavLink>
      <NavLink to={ROUTES.SOCIAL_PROFILE_BY_USERNAME_GEN(username!)}>
        <div
          className={cn(
            "flex items-center gap-4 rounded-lg p-2 transition-colors duration-100 ease-in hover:bg-muted",
            username === currentPath.split("/")[2]
              ? "bg-muted/70"
              : "bg-transparent",
          )}
        >
          <span>
            <UserRound />
          </span>
          <h3 className="text-lg">Social Profile</h3>
        </div>
      </NavLink>
      <div className="flex items-center gap-4 rounded-lg p-2 transition-colors duration-100 ease-in hover:bg-muted">
        <span>
          <Settings />
        </span>
        <h3 className="text-lg">Social Settings</h3>
      </div>
    </div>
  );
}
