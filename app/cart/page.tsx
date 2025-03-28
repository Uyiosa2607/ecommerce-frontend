"use client";
import Header from "@/components/Header";
import { useState } from "react";
import Footer from "@/components/Footer";
import CartContents from "@/components/CartContents";
import { PaystackButton } from "react-paystack";

export default function CartPage() {
  const publicKey = "pk_test_8fc607897f7b3d0cd0c6baf074ae36d4062b0845";
  const amount = 1000000;
  const [email, setEmail] = useState("admin@gmail.com");
  const [name, setName] = useState("real osas");
  const [phone, setPhone] = useState("09162239284");

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      alert("Thanks for doing business with us! Come back soon!!");
      console.log("do something ");
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Your Cart
        </h1>
        <CartContents />
      </main>
      <PaystackButton
        className="py-1 px-3 bg-green-700 text-white w-fit my-3 flex place-self-center rounded-md"
        {...componentProps}
      />
      <Footer />
    </div>
  );
}
