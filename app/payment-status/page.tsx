"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/utils";

export default function PaymentStatus() {
  const [status, setStatus] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (reference) {
      api
        .get(`/api/pay/verify-payment/${reference}`)
        .then((res) => {
          setStatus(res.data.message);
        })
        .catch(() => {
          setStatus("Payment verification failed");
        });
    }
  }, [reference, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl">{status}</h2>
    </div>
  );
}
