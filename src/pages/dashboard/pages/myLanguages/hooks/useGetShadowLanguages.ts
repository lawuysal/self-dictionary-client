import { useQuery } from "@tanstack/react-query";
import { getShadowLanguagesApi } from "../api/getShadowLanguages";

export function useGetShadowLanguages() {
  return useQuery<{ language: string; value: string }[]>({
    enabled: !!localStorage.getItem("token"),
    queryKey: ["getShadowLanguages"],
    queryFn: () => getShadowLanguagesApi(),
  });
}
