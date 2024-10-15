import { signupApi } from "@/api/auth/signup.api";
import { useToast } from "@/hooks/use-toast";
import { signup } from "@/redux/slices/auth/authSlice";
import ROUTES from "@/routes/Routes.enum";
import { waitAndExecute } from "@/util/waitAndExecute";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (credentials: { email: string; password: string }) =>
      signupApi(credentials.email, credentials.password),
    onSuccess: (data) => {
      dispatch(
        signup({
          token: data.token,
          userId: data.userId,
          userEmail: data.userEmail,
        }),
      );
      toast({
        title: "Signup successful",
        description: "You will be redirected to the home page",
      });
      waitAndExecute(1000, () => navigate(ROUTES.HOME));
    },
    onError: (error) => {
      toast({
        title: "Signup failed",
        description: "Please try again",
        variant: "destructive",
      });
      throw error;
    },
  });
};
