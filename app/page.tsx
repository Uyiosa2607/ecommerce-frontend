"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import SlidableBanner from "@/components/SlidableBanner";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getProducts() {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://shopping-backend-server.onrender.com/api/products"
      );
      if (response.status === 200) {
        setProducts(response.data);
        return setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <SlidableBanner />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Featured Products
        </h2>
        <ProductGrid loading={loading} products={products} />
      </main>
      <Footer />
    </div>
  );
}
