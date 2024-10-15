import { getProfileApi } from "@/api/user/getProfile.api";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/types/entities/profile.entity";

export function useGetProfile() {
  return useQuery<Profile, Error>({
    enabled: !!localStorage.getItem("token"),
    queryKey: ["getProfile"],
    queryFn: getProfileApi,
    retry: false,
  });
}
