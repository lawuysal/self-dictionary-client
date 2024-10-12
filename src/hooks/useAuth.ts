import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  login as loginAction,
  signup as signupAction,
} from "@/slices/auth/authSlice";
import { getMeApi, loginApi, signupApi } from "@/api/authAPI";
import { useToast } from "@/hooks/use-toast";
import { waitAndExecute } from "@/util/waitAndExecute";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/routes/Routes.enum";

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials: { email: string; password: string }) =>
      loginApi(credentials.email, credentials.password),
    onSuccess: (data) => {
      dispatch(loginAction({ token: data.token, userId: data.userId }));
      toast({
        title: "Login successful",
        description: "You will be redirected to the home page in 2 seconds",
      });
      waitAndExecute(2000, () => navigate(ROUTES.HOME));
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (credentials: { email: string; password: string }) =>
      signupApi(credentials.email, credentials.password),
    onSuccess: (data) => {
      dispatch(signupAction({ token: data.token, userId: data.userId }));
      toast({
        title: "Signup successful",
        description: "You will be redirected to the profile page in 2 seconds",
      });
      waitAndExecute(2000, () => navigate(ROUTES.HOME));
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

export const useGetMe = () => {
  return useQuery({
    enabled: !!localStorage.getItem("token"),
    queryKey: ["getMe"],
    queryFn: () => {
      return getMeApi();
    },
    retry: false,
  });
};
