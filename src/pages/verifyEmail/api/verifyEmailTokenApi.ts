import { Endpoints } from "@/api/endpoints";

export async function verifyEmailTokenApi(token: string) {
  return await fetch(Endpoints.VERIFY_EMAIL(token), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 409) {
        throw new Error("Email is already verified.");
      }
      if (res.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }
      if (!res.ok) {
        throw new Error("Failed to verify email.");
      }
      return res.json();
    })
    .then((data) => data)
    .catch((error) => {
      throw error;
    });
}
