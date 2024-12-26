import { signupApi } from "@/api/auth/signup.api";
import { toast } from "sonner";
import ROUTES from "@/routes/Routes.enum";
import { waitAndExecute } from "@/util/waitAndExecute";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (credentials: {
      email: string;
      password: string;
      captchaToken: string;
    }) =>
      signupApi(
        credentials.email,
        credentials.password,
        credentials.captchaToken,
      ),
    onSuccess: () => {
      toast.info("Signup successful", {
        description: "Now, you can verify your email.",
      });
      waitAndExecute(1000, () => navigate(ROUTES.VERIFY_YOUR_EMAIL));
    },
    onError: (error) => {
      toast("Signup failed", { description: "Please try again" });
      throw error;
    },
  });
};
