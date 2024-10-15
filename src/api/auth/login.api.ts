import { Endpoints } from "../endpoints";

export const loginApi = async (email: string, password: string) => {
  const data = await fetch(Endpoints.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Login failed");
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });

  return data;
};
