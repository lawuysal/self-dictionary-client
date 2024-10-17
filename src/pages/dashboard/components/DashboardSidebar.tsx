import ROUTES from "@/routes/Routes.enum";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  House,
  Languages,
  LayoutDashboard,
  Notebook,
  Settings,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function DashboardSidebar() {
  const { currentPath } = useSelector((state: RootState) => state.navigation);

  return (
    <aside className="absolute inset-y-0 left-0 z-10 hidden min-h-[calc(100svh-56px)] w-16 flex-col rounded-xl border-r bg-background md:flex">
      <nav className="flex flex-col items-center gap-4 pr-2 md:py-5">
        <div className="flex size-9 items-center justify-center rounded-full bg-primary text-foreground transition-colors md:size-8">
          <LayoutDashboard size={18} />
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to={ROUTES.DASHBOARD}
              className={`flex h-9 w-9 items-center ${currentPath === "/dashboard" ? "border bg-muted text-foreground" : "text-muted-foreground"} justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
            >
              <House size={22} />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to={ROUTES.MY_LANGUAGES}
              className={`flex h-9 w-9 items-center ${currentPath === "/dashboard/my-languages" ? "border bg-muted text-foreground" : "text-muted-foreground"} justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
            >
              <Languages size={22} />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">My languages</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to={ROUTES.ALL_NOTES}
              className={`flex h-9 w-9 items-center ${currentPath === "/dashboard/all-notes" ? "border bg-muted text-foreground" : "text-muted-foreground"} justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
            >
              <Notebook size={22} />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">All notes</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to={ROUTES.PROFILE}
              className={`flex h-9 w-9 items-center ${currentPath === "/dashboard/profile" ? "border bg-muted text-foreground" : "text-muted-foreground"} justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
            >
              <UserRound size={22} />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Profile</TooltipContent>
        </Tooltip>
      </nav>

      {/* Footer */}
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to={ROUTES.PREFERENCES}
              className={`flex h-9 w-9 items-center ${currentPath === "/dashboard/preferences" ? "border bg-muted text-foreground" : ""} justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
            >
              <Settings size={22} />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Preferences</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
