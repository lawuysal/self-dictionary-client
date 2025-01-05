import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { postUpdatePreferencesApi } from "../api/postUpdatePreferencesApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Preference } from "@/types/entities/preference.entity";
import { updatePreference } from "@/redux/slices/user/userPrefrenceSlice";
import i18next from "i18next";
import { useTheme } from "@/components/theme-provider";

export function useUpdatePreferences() {
  const { setTheme } = useTheme();
  const { userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  return useMutation({
    mutationKey: ["updatePreferences"],
    mutationFn: ({ theme, language }: { theme: string; language: string }) =>
      postUpdatePreferencesApi(theme, language, userId!),
    onSuccess: (data: Preference) => {
      toast.success("Preferences updated successfully");

      dispatch(
        updatePreference({ theme: data.theme, language: data.language }),
        setTheme(data.theme as "dark" | "light" | "system"),
        i18next.changeLanguage(data.language.split("-")[0]),
      );
    },
    onError: (error) => {
      toast.error("Preference update failed");
      throw error;
    },
  });
}
