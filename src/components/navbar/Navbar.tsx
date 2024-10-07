import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 transition-all duration-300 ease-in-out lg:grid lg:grid-cols-[1fr_2fr_1fr] lg:flex-row lg:justify-items-center">
      {/* Logo */}
      <div className="flex items-center justify-center gap-4">
        <NavbarMobile />
        <h1 className="justify-self-start text-2xl font-bold sm:text-3xl">
          Self <span className="rounded-lg text-primary">Dictionary</span>
        </h1>
      </div>

      <NavbarDesktop />
    </nav>
  );
}
