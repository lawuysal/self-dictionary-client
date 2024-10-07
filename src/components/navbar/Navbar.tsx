import { NavLink } from "react-router-dom";
import { NAVBAR_ROUTES } from "./NavbarRoutes";
import { Button } from "../ui/button";
import { DarkModeToggle } from "../mode-toggle";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:grid lg:grid-cols-[1fr_2fr_1fr] lg:flex-row lg:justify-items-center">
      {/* Logo */}
      <h1 className="justify-self-start text-3xl font-bold">Self Dictionary</h1>

      {/* Navbar Links */}
      <div>
        {NAVBAR_ROUTES.map((route) => (
          <NavLink to={route.path} key={route.label + route.path}>
            {route.label}
          </NavLink>
        ))}
      </div>

      {/* Trailling */}
      <div className="flex items-center justify-center gap-4 justify-self-end">
        <Button>Sign Up</Button>
        <DarkModeToggle />
      </div>
    </nav>
  );
}
