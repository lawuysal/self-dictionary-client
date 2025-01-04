import { NAVBAR_ROUTES } from "./NavbarRoutes";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { DarkModeToggle } from "../mode-toggle";
import ROUTES from "@/routes/Routes.enum";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import DashboardMobileSidebar from "./dashboard/DashboardMobileSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Endpoints } from "@/api/endpoints";
import { getAvatarFallbackText } from "@/util/getAvatarFallbackText";
import LogoutButton from "./LogoutButton";

export default function NavbarDesktop() {
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const { currentPath } = useSelector((state: RootState) => state.navigation);
  const { firstName, lastName, photoUrl } = useSelector(
    (state: RootState) => state.userProfile,
  );

  return (
    <>
      {/* Navbar Links */}
      <div className="hidden md:flex">
        {NAVBAR_ROUTES.map((route) => (
          <NavLink to={route.path} key={route.label + route.path}>
            <Button
              variant="link"
              className={`font-semibold ${currentPath.split("/")[1] === route.path.split("/")[1] ? "underline" : ""}`}
            >
              {route.label}
            </Button>
          </NavLink>
        ))}
      </div>

      {/* Trailling */}
      <div className="flex items-center justify-center gap-4 justify-self-end">
        <div className="hidden md:flex">
          {token && userId ? (
            <div className="flex gap-6">
              {firstName ? (
                <NavLink
                  to={ROUTES.PROFILE}
                  className="flex items-center gap-2"
                >
                  <Avatar className="border">
                    <AvatarImage
                      src={Endpoints.GET_IMAGE(photoUrl || "")}
                      alt={`${firstName} ${lastName} Profile photo`}
                    />
                    <AvatarFallback>
                      {getAvatarFallbackText(firstName, lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm transition-colors duration-200 ease-in-out hover:text-primary">
                    Welcome,{" "}
                    <strong className="font-semibold">{firstName}</strong>
                  </p>
                </NavLink>
              ) : null}
              <LogoutButton token={token} userId={userId} isDesktop={true} />
            </div>
          ) : (
            <NavLink to={ROUTES.LOGIN}>
              <Button>Login</Button>
            </NavLink>
          )}
        </div>
        <DashboardMobileSidebar />
        <DarkModeToggle />
      </div>
    </>
  );
}
