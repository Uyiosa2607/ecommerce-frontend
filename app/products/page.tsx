"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import axios from "axios";

export default function ProductsPage() {
  const [product, setProduct] = useState([]);

  async function getProducts() {
    try {
      const response = await axios.get("http://localhost:4001/api/products");
      if (response.status === 200) {
        setProduct(response?.data);
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Products
        </h1>
        <ProductGrid products={product} />
      </main>
      <Footer />
    </div>
  );
}
