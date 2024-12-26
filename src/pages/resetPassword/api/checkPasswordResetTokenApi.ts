import { Endpoints } from "@/api/endpoints";

export const checkPasswordResetTokenApi = async (resetToken: string) => {
  const data = await fetch(Endpoints.CHECK_PASSWORD_RESET_TOKEN(resetToken), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Checking password reset token failed");
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });

  return data;
};
