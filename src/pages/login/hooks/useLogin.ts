import { loginApi } from "@/api/auth/login.api";
import { getPreferenceApi } from "@/api/user/getPreference.api";
import { getProfileApi } from "@/api/user/getProfile.api";
import { toast } from "sonner";
import { login } from "@/redux/slices/auth/authSlice";
import { getPreference } from "@/redux/slices/user/userPrefrenceSlice";
import { getProfile } from "@/redux/slices/user/userProfileSlice";
import ROUTES from "@/routes/Routes.enum";
import { waitAndExecute } from "@/util/waitAndExecute";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUserResponse } from "../types/loginUserResponse.type";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials: { email: string; password: string }) =>
      loginApi(credentials.email, credentials.password),
    onSuccess: async (data: LoginUserResponse) => {
      dispatch(
        login({
          token: data.token,
          userId: data.userId,
          userEmail: data.userEmail,
          hasProfile: data.hasProfile,
        }),
      );
      toast("Login successful", {
        description: "You will be redirected to Dashboard",
      });

      const profile = await getProfileApi()
        .then((profile) => profile)
        .catch(() => null);

      if (profile) {
        dispatch(getProfile(profile));
      }

      const preference = await getPreferenceApi()
        .then((preference) => preference)
        .catch(() => null);

      if (preference) {
        dispatch(getPreference(preference));
      }

      waitAndExecute(1000, () => navigate(ROUTES.DASHBOARD, { replace: true }));
    },
    onError: (error) => {
      if (error.message === "Email is not verified") {
        toast.error("Email is not verified", {
          description:
            "Please verify your email before logging in. Check your email for verification link.",
        });
      } else {
        toast.error("Login failed", {
          description: "Invalid email or password",
        });
      }
      throw error;
    },
  });
};
