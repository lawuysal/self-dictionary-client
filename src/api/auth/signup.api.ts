import { Endpoints } from "../endpoints";

export const signupApi = async (
  email: string,
  password: string,
  captchaToken: string,
) => {
  const data = await fetch(Endpoints.SIGNUP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, captchaToken }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Signup failed");
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });

  return data;
};
