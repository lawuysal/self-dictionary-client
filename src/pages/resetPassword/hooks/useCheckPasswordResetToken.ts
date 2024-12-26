import { useQuery } from "@tanstack/react-query";
import { checkPasswordResetTokenApi } from "../api/checkPasswordResetTokenApi";

export function useCheckPasswordResetToken(resetToken: string) {
  return useQuery({
    queryKey: ["checkPasswordResetToken"],
    queryFn: () => checkPasswordResetTokenApi(resetToken),
    retry: 0,
  });
}
