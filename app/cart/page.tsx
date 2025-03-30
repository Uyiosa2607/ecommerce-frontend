"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartContents from "@/components/CartContents";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-1.5 lg:px-4 py-4">
        <h1 className="text-lg font-bold mb-4 text-center text-gray-800">
          Your Cart
        </h1>
        <CartContents />
      </main>
      <Footer />
    </div>
  );
}
