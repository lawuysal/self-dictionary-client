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

export default function NavbarMobile() {
  return (
    <Sheet>
      <SheetTrigger className="flex md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="flex w-72 flex-col gap-8">
        <SheetHeader className="flex flex-col gap-4">
          <SheetTitle className="font-semibold text-primary">Menu</SheetTitle>
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
        <SheetFooter>
          <SheetClose asChild>
            <Button className="w-full">Sign Up</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
