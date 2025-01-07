"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardContent from "@/components/DashboardContent";
import { useRouter } from "next/navigation";
import { api } from "@/lib/utils";

export default function DashboardPage() {
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  async function getAuthStatus() {
    try {
      setLoading(true);
      const response = await api.get(
        "http://localhost:4001/api/auth/get-auth",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setAuth(true);
        return;
      }
    } catch (error) {
      console.log("error:", error);
      return router.push("/");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAuthStatus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Dashboard</h1>
        <DashboardContent />
      </main>
      <Footer />
    </div>
  );
}
