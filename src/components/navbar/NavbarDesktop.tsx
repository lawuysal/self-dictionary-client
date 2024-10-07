import { NAVBAR_ROUTES } from "./NavbarRoutes";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { DarkModeToggle } from "../mode-toggle";

export default function NavbarDesktop() {
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
        <Button className="hidden md:flex">Sign Up</Button>
        <DarkModeToggle />
      </div>
    </>
  );
}
