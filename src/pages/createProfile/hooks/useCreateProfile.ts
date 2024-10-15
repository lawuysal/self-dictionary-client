import { useMutation } from "@tanstack/react-query";
import { CreateProfileRequest } from "../types/createProfileRequest.type";
import { useDispatch } from "react-redux";
import { getProfile as getProfileAction } from "@/redux/slices/user/userProfileSlice";
import { profileCreated as profileCreatedAction } from "@/redux/slices/auth/authSlice";
import { useToast } from "@/hooks/use-toast";
import { createProfileApi } from "../api/createProfileApi";

export function useCreateProfile() {
  const { toast } = useToast();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["createProfile"],
    mutationFn: (profileData: CreateProfileRequest) =>
      createProfileApi(profileData),
    onSuccess: (data) => {
      dispatch(
        getProfileAction({
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          bio: data.bio,
          photoUrl: data.photoUrl,
        }),
      );

      dispatch(profileCreatedAction());
    },
    onError: (error) => {
      toast({
        title: "Profile creation failed",
        description: `${error.message}`,
        variant: "destructive",
      });
      throw error;
    },
  });
}
