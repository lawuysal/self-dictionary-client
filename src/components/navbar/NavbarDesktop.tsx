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
import { waitAndExecute } from "@/util/waitAndExecute";
import { cleanPreference } from "@/redux/slices/user/userPrefrenceSlice";

export default function NavbarDesktop() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { token, userId } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {/* Navbar Links */}
      <div className="hidden md:flex">
        {NAVBAR_ROUTES.map((route) => (
          <NavLink to={route.path} key={route.label + route.path}>
            <Button variant="link" className="font-semibold">
              {route.label}
            </Button>
          </NavLink>
        ))}
      </div>

      {/* Trailling */}
      <div className="flex items-center justify-center gap-4 justify-self-end">
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
              waitAndExecute(1000, () => navigate(ROUTES.HOME));
            }}
          >
            Logout
          </Button>
        ) : (
          <NavLink to={ROUTES.LOGIN}>
            <Button>Login</Button>
          </NavLink>
        )}
        <DarkModeToggle />
      </div>
    </>
  );
}
