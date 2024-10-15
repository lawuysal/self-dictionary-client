import { NavLink } from "react-router-dom";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import ROUTES from "@/routes/Routes.enum";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-[90rem] items-center justify-between border-b-[1px] px-4 py-2 transition-all duration-300 ease-in-out md:border-b-0 lg:grid lg:grid-cols-[1fr_2fr_1fr] lg:flex-row lg:justify-items-center">
      {/* Logo */}
      <div className="relative flex items-center justify-center gap-3 self-start justify-self-start">
        <NavbarMobile />

        <NavLink to={ROUTES.HOME}>
          <h1 className="text-2xl font-bold sm:text-3xl">
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
