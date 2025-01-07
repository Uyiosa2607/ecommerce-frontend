import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const api = axios.create({
  baseURL: "http://localhost:4001",
  withCredentials: true,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response) {
      const status = error.response.status;

      if (
        (status === 401 && !originalRequest._retry) ||
        (status === 403 && !originalRequest._retry)
      ) {
        originalRequest._retry = true;
        console.log("403 detected. Attempting token refresh...");

        const success = await axios.get(
          "http://localhost:4001/api/auth/refresh-token",
          {
            withCredentials: true,
          }
        );
        if (success.status === 200) {
          console.log("Tokens were refreshed. Retrying original request...");
          return api(originalRequest);
        } else {
          console.log("Token refresh failed. Redirecting to login.");
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export { api };
