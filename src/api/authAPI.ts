import { Endpoints } from "./endpoints";

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

export const signupApi = async (email: string, password: string) => {
  const data = await fetch(Endpoints.SIGNUP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
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
