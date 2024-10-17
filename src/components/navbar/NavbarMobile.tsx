import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NAVBAR_ROUTES } from "./NavbarRoutes";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import ROUTES from "@/routes/Routes.enum";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/auth/authSlice";
import { cleanProfile } from "@/redux/slices/user/userProfileSlice";
import { cleanPreference } from "@/redux/slices/user/userPrefrenceSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function NavbarMobile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { token, userId } = useSelector((state: RootState) => state.auth);

  function RenderAuthState() {
    if (!token && !userId) {
      return (
        <>
          <SheetClose asChild>
            <NavLink to={ROUTES.SIGNUP}>
              <Button className="w-full">Signup</Button>
            </NavLink>
          </SheetClose>

          <SheetClose asChild>
            <NavLink to={ROUTES.LOGIN}>
              <Button className="w-full" variant="secondary">
                Login{" "}
              </Button>
            </NavLink>
          </SheetClose>
        </>
      );
    }

    return (
      <SheetClose asChild>
        <Button
          className=""
          variant="destructive"
          onClick={() => {
            dispatch(logout());
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
      </SheetClose>
    );
  }

  return (
    <Sheet>
      <SheetTrigger className="flex md:absolute md:hidden">
        <Menu className="p-1" size={36} />
      </SheetTrigger>
      <SheetContent side="left" className="flex w-72 flex-col gap-8">
        <SheetHeader className="flex flex-col gap-4">
          <SheetTitle className="font-playfair font-semibold text-primary">
            Menu
          </SheetTitle>
          <div className="flex flex-col gap-2">
            {NAVBAR_ROUTES.map((route) => (
              <NavLink to={route.path} key={route.label + route.path}>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="flex w-full self-start font-medium"
                  >
                    {route.label}
                  </Button>
                </SheetClose>
              </NavLink>
            ))}
          </div>
        </SheetHeader>
        <SheetFooter className="flex flex-col gap-4">
          {RenderAuthState()}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
