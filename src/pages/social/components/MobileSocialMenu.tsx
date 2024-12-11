import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import ROUTES from "@/routes/Routes.enum";
import {
  ArrowUp,
  ClockArrowUp,
  Newspaper,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function MobileSocialMenu() {
  const { currentPath } = useSelector((state: RootState) => state.navigation);
  const { username } = useSelector((state: RootState) => state.userProfile);

  const menuItems = [
    {
      to: ROUTES.LATEST_SOCIAL_POSTS,
      icon: <ClockArrowUp />,
      label: "Latest Posts",
      isActive:
        ROUTES.LATEST_SOCIAL_POSTS.split("/")[2] === currentPath.split("/")[2],
    },
    {
      to: ROUTES.POSITIVE_ACTIONED_SOCIAL_POSTS,
      icon: <ArrowUp />,
      label: "Supported Posts",
      isActive:
        ROUTES.POSITIVE_ACTIONED_SOCIAL_POSTS.split("/")[2] ===
        currentPath.split("/")[2],
    },
    {
      to: ROUTES.MY_SOCIAL_POSTS,
      icon: <Newspaper />,
      label: "My Posts",
      isActive:
        ROUTES.MY_SOCIAL_POSTS.split("/")[2] === currentPath.split("/")[2],
    },
    {
      to: ROUTES.MY_FOLLOWINGS_SOCIAL_POSTS,
      icon: <UsersRound />,
      label: "My Followings",
      isActive:
        ROUTES.MY_FOLLOWINGS_SOCIAL_POSTS.split("/")[2] ===
        currentPath.split("/")[2],
    },
    {
      to: ROUTES.SOCIAL_PROFILE_BY_USERNAME_GEN(username!),
      icon: <UserRound />,
      label: "Social Profile",
      isActive: username === currentPath.split("/")[2],
    },
  ];

  return (
    <div className="flex w-full items-center justify-between border-t bg-background py-2 md:hidden">
      {menuItems.map((item, index) => (
        <NavLink to={item.to} key={index} className="flex w-[90%]">
          <div
            className={cn(
              "flex items-center justify-start gap-2 text-nowrap rounded-lg px-6 py-2 transition-all duration-300 ease-in-out",
              item.isActive ? "w-44 bg-muted/70" : "w-12 bg-transparent",
            )}
            style={{ transitionProperty: "width, background-color" }}
          >
            <span className="text-lg">{item.icon}</span>
            <span
              className={cn(
                "overflow-hidden text-sm font-medium transition-opacity duration-300 ease-in-out",
                item.isActive ? "opacity-100" : "opacity-0",
              )}
            >
              {item.label}
            </span>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
