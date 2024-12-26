import { Endpoints } from "@/api/endpoints";

export const resetPasswordApi = async (
  password: string,
  passwordConfirmation: string,
  captchaToken: string,
  resetToken: string,
) => {
  const data = await fetch(Endpoints.RESET_PASSWORD(resetToken), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, passwordConfirmation, captchaToken }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Resetting password failed");
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });

  return data;
};
