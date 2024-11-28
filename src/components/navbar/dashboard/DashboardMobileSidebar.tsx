import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Home,
  Languages,
  LayoutDashboard,
  Notebook,
  PanelRight,
  Settings,
  UserRound,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { NavLink } from "react-router-dom";
import ROUTES from "@/routes/Routes.enum";

export default function DashboardMobileSidebar() {
  const { currentPath } = useSelector((state: RootState) => state.navigation);

  return (
    <Sheet>
      <SheetTrigger
        className={`${currentPath.split("/")[1] === "dashboard" ? "flex" : "hidden"} md:hidden`}
      >
        <PanelRight />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-left">
          <SheetTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-primary text-foreground transition-colors">
              <LayoutDashboard />
            </div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <nav className="mt-10 flex flex-col gap-4 text-xl">
          <NavLink
            to={ROUTES.DASHBOARD}
            className={`rounded-md ${currentPath === ROUTES.DASHBOARD ? "bg-muted" : ""} flex items-center px-2 py-1 hover:bg-muted/40`}
          >
            <SheetClose asChild>
              <div className="flex w-full items-center gap-3">
                <Home size={20} /> Dashboard
              </div>
            </SheetClose>
          </NavLink>

          <NavLink
            to={ROUTES.MY_LANGUAGES}
            className={`rounded-md ${currentPath.split("/")[2] === "my-languages" ? "bg-muted" : ""} flex items-center px-2 py-1 hover:bg-muted/40`}
          >
            <SheetClose asChild>
              <div className="flex w-full items-center gap-3">
                <Languages size={20} /> My Languages
              </div>
            </SheetClose>
          </NavLink>

          <NavLink
            to={ROUTES.ALL_NOTES}
            className={`rounded-md ${currentPath === ROUTES.ALL_NOTES ? "bg-muted" : ""} flex items-center px-2 py-1 hover:bg-muted/40`}
          >
            <SheetClose asChild>
              <div className="flex w-full items-center gap-3">
                <Notebook size={20} /> All notes
              </div>
            </SheetClose>
          </NavLink>

          <NavLink
            to={ROUTES.PROFILE}
            className={`rounded-md ${currentPath === ROUTES.PROFILE ? "bg-muted" : ""} flex items-center px-2 py-1 hover:bg-muted/40`}
          >
            <SheetClose asChild>
              <div className="flex w-full items-center gap-3">
                <UserRound size={20} /> Profile
              </div>
            </SheetClose>
          </NavLink>

          <NavLink
            to={ROUTES.PREFERENCES}
            className={`rounded-md ${currentPath === ROUTES.PREFERENCES ? "bg-muted" : ""} flex items-center px-2 py-1 hover:bg-muted/40`}
          >
            <SheetClose asChild>
              <div className="flex w-full items-center gap-3">
                <Settings size={20} />
                Preferences
              </div>
            </SheetClose>
          </NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
