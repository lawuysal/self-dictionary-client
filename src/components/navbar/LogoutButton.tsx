import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/redux/slices/auth/authSlice";
import { cleanProfile } from "@/redux/slices/user/userProfileSlice";
import { cleanPreference } from "@/redux/slices/user/userPrefrenceSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/routes/Routes.enum";
import { cn } from "@/lib/utils";

export default function LogoutButton({
  token,
  userId,
  isDesktop,
  setIsOpen,
}: {
  setIsOpen?: (value: boolean) => void;
  token: string | null;
  userId: string | null;
  isDesktop: boolean;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Dialog>
      <DialogTrigger>
        {token && userId && (
          <Button
            variant="destructive"
            size={isDesktop ? "icon" : "default"}
            className={cn("", !isDesktop && "w-full")}
          >
            <LogOut className={cn("size-5", !isDesktop && "hidden")} />{" "}
            {isDesktop ? "" : "Logout"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Do you want to logout?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex gap-3">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={() => {
                dispatch(logoutAction());
                dispatch(cleanProfile());
                dispatch(cleanPreference());
                toast.info("Logout successful", {
                  description: "You will be redirected to the login page,",
                });
                navigate(ROUTES.LOGIN, { replace: true });
                setIsOpen?.(false);
              }}
            >
              Logout
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
