import { NavLink } from "react-router-dom";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import ROUTES from "@/routes/Routes.enum";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 mx-auto flex w-full max-w-[92rem] items-center justify-between border-b-[1px] border-border/40 bg-background/95 px-4 py-2 backdrop-blur transition-all duration-300 ease-in-out supports-[backdrop-filter]:bg-background/60 md:border-b-0 lg:grid lg:grid-cols-[1fr_2fr_1fr] lg:flex-row lg:justify-items-center">
      {/* Logo */}
      <div className="relative flex max-h-[36.2px] min-h-[36.2px] items-center justify-center gap-3 self-start justify-self-start">
        <NavbarMobile />

        <NavLink to={ROUTES.HOME}>
          <h1 className="text-2xl font-bold md:text-3xl">
            Self{" "}
            <span className="rounded-lg font-playfair text-primary">
              Dictionary
            </span>
          </h1>
        </NavLink>
      </div>

      <NavbarDesktop />
    </nav>
  );
}
