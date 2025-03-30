"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/utils";

function PaymentStatusContent() {
  const [status, setStatus] = useState(
    "Please wait while payment is being confirmed...."
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (reference) {
      api
        .get(`/api/pay/verify-payment/${reference}`)
        .then(() => {
          setStatus("Payment verification was successfull");
        })
        .catch(() => {
          setStatus("Payment verification failed");
        });
    }
  }, [reference, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="mb-4">Confirm payment page</p>
      <h2 className="text-2xl">{status}</h2>
    </div>
  );
}

export default function PaymentStatus() {
  return (
    <Suspense fallback={<p>Loading payment status...</p>}>
      <PaymentStatusContent />
    </Suspense>
  );
}
