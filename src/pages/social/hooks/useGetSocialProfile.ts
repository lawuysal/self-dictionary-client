import { useQuery } from "@tanstack/react-query";
import { getSocialProfileApi } from "../api/getSocialProfileApi";
import { Profile } from "@/types/entities/profile.entity";

export function useGetSocialProfile(username: string) {
  return useQuery<Profile, Error>({
    enabled: !!localStorage.getItem("token"),
    queryKey: ["getSocialProfile", username],
    queryFn: () => getSocialProfileApi(username),
    retry: 0,
  });
}
