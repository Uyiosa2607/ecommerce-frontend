"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";
import axios from "axios";

async function testPay() {
  const email = "admin@gmail.com";
  const amount = 200;
  const data = {
    email,
    amount,
  };
  try {
    const response = await axios.post(
      "http://localhost:4001/api/pay/initialize-payment",
      data,
      {
        withCredentials: false,
      }
    );
    if (response.status === 200) {
      window.location.href = response.data?.data?.authorization_url;
    }
    console.log(response.data?.data?.authorization_url);
  } catch (error) {
    console.log(error);
  }
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
        <CheckoutForm />
        <button
          onClick={testPay}
          className="my-4 w-fit py-1 px-2 bg-green-600 flex place-self-center text-white"
        >
          Pay now
        </button>
      </main>
      <Footer />
    </div>
  );
}
