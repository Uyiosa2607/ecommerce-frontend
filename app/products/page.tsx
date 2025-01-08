"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { api } from "@/lib/utils";

export default function ProductsPage() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getProducts() {
    try {
      const response = await api.get("/api/products");
      if (response.status === 200) {
        setProduct(response?.data);
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
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Our Products
        </h1>
        <ProductGrid loading={loading} products={product} />
      </main>
      <Footer />
    </div>
  );
}
