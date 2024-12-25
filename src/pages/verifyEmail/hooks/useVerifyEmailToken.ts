import { useQuery } from "@tanstack/react-query";
import { verifyEmailTokenApi } from "../api/verifyEmailTokenApi";

export function useVerifyEmailToken(token: string) {
  return useQuery({
    queryKey: ["verifyUserEmail", token],
    queryFn: () => verifyEmailTokenApi(token),
    retry: 0,
  });
}
