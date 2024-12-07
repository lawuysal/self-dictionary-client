import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { updateProfileRequestApi } from "../api/updateProfileRequestApi";
import { useDispatch } from "react-redux";
import { getProfile } from "@/redux/slices/user/userProfileSlice";

export function useUpdateProfile() {
  const { toast } = useToast();
  const ownerId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["updatenote", ownerId],
    mutationFn: (noteData: FormData) => updateProfileRequestApi(noteData),
    onSuccess: (data) => {
      toast({
        title: "Profile updated successfully",
        description: "Your profile has been updated successfully.",
      });
      dispatch(getProfile({ ...data }));
    },
    onError: (error) => {
      toast({
        title: "Profile update failed",
        description: `${error.message}`,
        variant: "destructive",
      });
      throw error;
    },
  });
}
