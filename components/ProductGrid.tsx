/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
// import { useCartStore } from "@/lib/store";

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
}

// interface ProductGridProps {
//   products: Product[];
//   loading: boolean;
// }

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const elements = Array.from({ length: 8 });
  // const { addToCart } = useCartStore();

  async function getProducts() {
    try {
      const res = await fetch("http://localhost:4001/api/v1/auth/auth-status", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Not authenticated");
      }

      const data = await res.json();
      console.log("User is authenticated:", data.user);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="grid grid-cols-2 w-full  mt-10 bg-white sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <>
        {loading ? (
          <>
            {elements.map((item, index) => (
              <div key={index}>
                <Skeleton className="h-[200px] mb-3 w-full rounded-xl" />
                <Skeleton className="h-8 mb-2 w-[70%] rounded-xl" />
              </div>
            ))}
          </>
        ) : (
          <>
            {" "}
            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden bg-gray-50 w-full p-2 rounded-lg group-hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative ">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      quality={100}
                      className="w-full h-[140px] lg:h-[200px] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                  </Link>
                </div>
                <div className="flex mt-2 w-ful  flex-col items-start">
                  <Link
                    href={`/products/${product.id}`}
                    className="hover:text-purple-600 transition-colors"
                  >
                    <p className="text-xs lg:text-sm relative w-full truncate font-medium text-gray-800">
                      {product.title}
                    </p>
                  </Link>
                  <p className="text-gray-800 font-semibold text-sm">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </>
    </div>
  );
}
