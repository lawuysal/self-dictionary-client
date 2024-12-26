import { toast } from "sonner";
import ROUTES from "@/routes/Routes.enum";
import { waitAndExecute } from "@/util/waitAndExecute";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../api/forgotPasswordApi";

export const useForgotPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: (credentials: { email: string; captchaToken: string }) =>
      forgotPasswordApi(credentials.email, credentials.captchaToken),
    onSuccess: () => {
      toast.info("Password reset link sent to your email", {
        description: "Please check your email",
      });
      waitAndExecute(3000, () => navigate(ROUTES.LOGIN));
    },
    onError: (error) => {
      toast.error("Sending reset link failed", {
        description: "Please try again",
      });
      throw error;
    },
  });
};
