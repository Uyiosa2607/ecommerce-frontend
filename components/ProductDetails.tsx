/* eslint-disable @next/next/no-img-element */

/* eslint-disable @typescript-eslint/no-unused-vars */

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
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  async function getProduct(id: string) {
    try {
      setLoading(true);
      const response = await api.get(`/api/products/items?product=${id}`);
      if (response.status === 200) {
        setProduct(response.data);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct(id);
  }, []);

  // const handleAddToCart = () => {
  //   console.log(
  //     `Added ${quantity} of product ${id} in color ${selectedColor} to cart`
  //   );
  //   // Implement actual cart functionality here
  // };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-square">
              {loading ? (
                <Skeleton className="w-full h-full  rounded-xl" />
              ) : (
                product && (
                  <Image
                    src={product.img[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    quality={100}
                  />
                )
              )}
            </div>
          </CardContent>
        </Card>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {product?.img.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-md ${
                selectedImage === index ? "ring-2 ring-purple-500" : ""
              }`}
            >
              {loading ? (
                <Skeleton className="w-[100%] h-[100%] rounded-xl" />
              ) : (
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="lg:w-1/3">
        {loading ? (
          <Skeleton className="h-8 w-[70%]" />
        ) : (
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {product?.name}
          </h1>
        )}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {/* {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))} */}
          </div>
          <span className="ml-2 text-gray-600">
            {/* {product?.rating} ({product.reviews} reviews) */}
          </span>
        </div>
        {loading ? (
          <Skeleton className="h-8 mb-2 w-[55%]" />
        ) : (
          <p className="text-3xl font-semibold mb-6 text-purple-600">
            ${product?.price}
          </p>
        )}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Color</h3>
          <div className="flex space-x-2">
            {/* {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color
                    ? "border-purple-500"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                aria-label={color}
              />
            ))} */}
          </div>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            variant="outline"
            size="icon"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-xl font-semibold">{quantity}</span>
          <Button
            onClick={() => setQuantity(quantity + 1)}
            variant="outline"
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-4 mb-8">
          <Button
            disabled={loading}
            // onClick={handleAddToCart}
            size="lg"
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specs">Specs</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p className="text-gray-600 leading-relaxed">{product?.desc}</p>
          </TabsContent>
          <TabsContent value="features" className="mt-4">
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {product?.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specs" className="mt-4">
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {product?.specs.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
