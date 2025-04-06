/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface Product {
  name: string;
  id: string;
  price: number;
  desc: string;
  img: string[];
  features: string[];
  specs: string[];
}

interface PageProps {
  id: string;
}

export default function ProductDetails({ id }: PageProps) {
  // const [product, setProduct] = useState<Product | null>(null);
  // const [quantity, setQuantity] = useState(1);
  // const [selectedImage, setSelectedImage] = useState(0);
  // const [loading, setLoading] = useState<boolean>(true);

  // async function getProduct(id: string) {
  //   try {
  //     setLoading(true);
  //     const response = await api.get(`/api/products/items?product=${id}`);
  //     if (response.status === 200) {
  //       setProduct(response.data);
  //       setLoading(false);
  //       return;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getProduct(id);
  // }, []);

  return (
    <div>
      <div className="hidden md:flex  z-[100] w-full text-neutral-900 p-2 text-sm capitalize flex-row justify-between items-center">
        <div className="flex flex-row gap-8 items-center">
          <h3>Brand Logo</h3>
          <div className="flex gap-8 flex-row items-center">
            <p>categories</p>
            <p>collections</p>
            <p>blog</p>
          </div>
        </div>
        <div>
          <div className="flex flex-row  gap-8 items-center">
            <p>search</p>
            <p>cart</p>
            <p>login</p>
          </div>
        </div>
      </div>
      <main></main>
    </div>
  );
}
