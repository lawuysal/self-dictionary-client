import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { CreatePreferenceRequest } from "../types/createPreferenceRequest.type";

import { getPreference as getPreferenceAction } from "@/redux/slices/user/userPrefrenceSlice";
import ROUTES from "@/routes/Routes.enum";
import { waitAndExecute } from "@/util/waitAndExecute";
import { useNavigate } from "react-router-dom";
import { createPreferenceApi } from "../api/createPreferenceApi";

export function useCreatePreference() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["createPreference"],
    mutationFn: (preferenceData: CreatePreferenceRequest) =>
      createPreferenceApi(preferenceData),
    onSuccess: (data) => {
      dispatch(
        getPreferenceAction({
          theme: data.theme,
          language: data.language,
        }),
      );

      waitAndExecute(1000, () => navigate(ROUTES.HOME));
    },
    onError: (error) => {
      toast({
        title: "Preference creation failed",
        description: `${error.message}`,
        variant: "destructive",
      });
      throw error;
    },
  });
}
