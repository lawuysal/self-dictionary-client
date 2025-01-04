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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LogoutButton from "./LogoutButton";
import { useState } from "react";

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
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
      <LogoutButton
        token={token}
        userId={userId}
        isDesktop={false}
        setIsOpen={setIsOpen}
      />
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
