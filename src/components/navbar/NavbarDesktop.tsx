import { NAVBAR_ROUTES } from "./NavbarRoutes";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { DarkModeToggle } from "../mode-toggle";
import ROUTES from "@/routes/Routes.enum";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "@/redux/slices/auth/authSlice";
import { cleanProfile } from "@/redux/slices/user/userProfileSlice";
import { useToast } from "@/hooks/use-toast";
import { cleanPreference } from "@/redux/slices/user/userPrefrenceSlice";
import DashboardMobileSidebar from "./dashboard/DashboardMobileSidebar";

export default function NavbarDesktop() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const { currentPath } = useSelector((state: RootState) => state.navigation);

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
            <Button
              variant="destructive"
              onClick={() => {
                dispatch(logoutAction());
                dispatch(cleanProfile());
                dispatch(cleanPreference());
                toast({
                  title: "Logout successful",
                  description: "You will be redirected to the home page ",
                });
                navigate(ROUTES.HOME, { replace: true });
              }}
            >
              Logout
            </Button>
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
