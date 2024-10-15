import { Endpoints } from "../endpoints";

export const getMeApi = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token");
  }

  const data = await fetch(Endpoints.ME, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Get me failed");
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });

  return data;
};
