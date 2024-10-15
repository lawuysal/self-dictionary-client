import { getMeApi } from "@/api/auth/getMe.api";
import { useQuery } from "@tanstack/react-query";

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
