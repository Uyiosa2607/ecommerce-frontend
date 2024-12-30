"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Products {
  name: string;
  desc: string;
  id: string;
  price: string;
}

export default function Home() {
  const [devices, setDevices] = useState<Products[]>([]);
  const router = useRouter();

  async function refreshTokens() {
    try {
      const response = await axios.get(
        "http://localhost:4001/api/auth/refresh-token",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) return true;
    } catch (error) {
      console.log("Token refresh failed:", error);
      return false;
    }
  }

  async function handleSignOut() {
    try {
      const response = await axios.get(
        "http://localhost:4001/api/auth/signout",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) return router.push("/login");
    } catch (error) {
      console.log("there was a problem trying to logout:", error);
    }
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

        if (status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          console.log("403 detected. Attempting token refresh...");

          const success = await refreshTokens();
          if (success) {
            console.log("Tokens were refreshed. Retrying original request...");
            return api(originalRequest);
          } else {
            console.log("Token refresh failed. Redirecting to login.");
            setDevices([]);
            router.push("/login");
            return Promise.reject(error);
          }
        }

        if (status === 401) {
          console.log("Unauthorized access (401). Redirecting to login.");
          setDevices([]);
          router.push("/login");
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  async function getProducts() {
    try {
      const response = await api.get("/api/products");
      if (response.data) {
        setDevices(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  async function getAuth() {
    try {
      const response = await api.get("/api/auth/get-auth");
      if (response.status === 200) {
        await getProducts();
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  }

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-medium mb-14 text-2xl text-red-500 uppercase">
        This is home
      </h1>
      <div>
        <ul>
          {devices.length > 0 ? (
            devices.map((product: Products) => (
              <li className="mb-2" key={product.id}>
                {product.name}
              </li>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </ul>
      </div>
      <button
        className="mt-8 bg-red-600 text-white rounded-md px-4 py-2"
        onClick={handleSignOut}
      >
        signout
      </button>
    </div>
  );
}
