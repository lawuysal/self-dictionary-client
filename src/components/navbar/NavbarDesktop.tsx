import { NAVBAR_ROUTES } from "./NavbarRoutes";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { DarkModeToggle } from "../mode-toggle";
import ROUTES from "@/routes/Routes.enum";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "@/slices/auth/authSlice";
import { useToast } from "@/hooks/use-toast";
import { WaitAndExecute } from "@/util/WaitAndExecute";

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
              toast({
                title: "Logout successful",
                description:
                  "You will be redirected to the home page in 2 seconds",
              });
              WaitAndExecute(2000, () => navigate(ROUTES.HOME));
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
