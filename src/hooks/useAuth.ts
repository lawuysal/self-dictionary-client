import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login as loginAction } from "@/slices/auth/authSlice";
import { getMeApi, loginApi, signupApi } from "@/api/authAPI";
import { useToast } from "@/hooks/use-toast";
import { WaitAndExecute } from "@/util/WaitAndExecute";
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
      WaitAndExecute(2000, () => navigate(ROUTES.HOME));
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
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (credentials: { email: string; password: string }) =>
      signupApi(credentials.email, credentials.password),
    onSuccess: (data) => {
      dispatch(loginAction({ token: data.token, userId: data.userId }));
    },
    onError: (error) => {
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
  });
};
