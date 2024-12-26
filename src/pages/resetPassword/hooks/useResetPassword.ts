import { toast } from "sonner";
import ROUTES from "@/routes/Routes.enum";
import { waitAndExecute } from "@/util/waitAndExecute";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../api/resetPasswordApi";

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (credentials: {
      password: string;
      passwordConfirmation: string;
      captchaToken: string;
      resetToken: string;
    }) =>
      resetPasswordApi(
        credentials.password,
        credentials.passwordConfirmation,
        credentials.captchaToken,
        credentials.resetToken,
      ),
    onSuccess: () => {
      toast.success("Successfully resetted password", {
        description: "You can login with your new password now",
      });
      waitAndExecute(3000, () => navigate(ROUTES.LOGIN));
    },
    onError: (error) => {
      toast.error("Resetting password failed.", {
        description: "Please try again",
      });
      throw error;
    },
  });
};
