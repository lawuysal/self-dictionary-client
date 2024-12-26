import { Endpoints } from "@/api/endpoints";

export const forgotPasswordApi = async (
  email: string,
  captchaToken: string,
) => {
  const data = await fetch(Endpoints.FORGOT_PASSWORD, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, captchaToken }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Sending password reset link failed");
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });

  return data;
};
