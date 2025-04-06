import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const api = axios.create({
  baseURL: "https://shopping-backend-server-1.onrender.com",
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
        try {
          const success = await axios.get(
            "https://shopping-backend-server-1.onrender.com/api/v1/auth/auth-status",
            {
              withCredentials: true,
            }
          );
          if (success.status === 200) {
            return api(originalRequest);
          }
        } catch (error) {
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export { api };
