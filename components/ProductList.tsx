"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import EditProductForm from "./EditProductForm";
import { api } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string[];
  features: string[];
  specs: string[];
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("http://localhost:4001/api/products");
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log("something went wrong unable to fetch product:", error);
      }
    }
    getProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`/api/products/remove?product=${id}`);
      if (response.status === 200) {
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = () => {
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-4">
              <Image
                src={product.img[0]}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-[200px] object-cover mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.desc}</p>
              <p className="text-gray-800 font-bold">${product.price}</p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/products/${product.id}`}>View</Link>
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => handleEdit(product)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
