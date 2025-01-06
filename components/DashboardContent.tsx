"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductList from "./ProductList";
import { Loader2 } from "lucide-react";

interface NewProduct {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface Products {
  name: string;
  desc: string;
  price: string;
  image: string;
}

export default function DashboardContent() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  async function verifyAdminStatus() {
    setLoading(true);
    try {
      const getUser = await axios.get(
        "http://localhost:4001/api/auth/get-auth",
        { withCredentials: true }
      );
      const isAdmin = getUser.data?.user?.isAdmin;
      if (isAdmin !== true) {
        console.log("user is not admin, cant acess route");
        return router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // async function getProducts() {
  //   try {
  //     const response = await axios.get("http://localhost:4001/api/products");
  //     if (response.status === 200) {
  //       setProducts(response.data);
  //     }
  //   } catch (error) {
  //     console.log("something went wrong unable to fetch product:", error);
  //   }
  // }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const desc = formData.get("desc") as string;
    const price = Number(formData.get("price"));
    const img = formData.get("image") as string;

    const data = {
      name,
      desc,
      price,
      img,
    };

    try {
      const response = await axios.post(
        "http://localhost:4001/api/products/add-product",
        data,
        { withCredentials: true }
      );
      if (response.status === 201) return console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // Here you would typically send the data to your backend
    // setShowAddProduct(false);
    // setNewProduct({ name: "", description: "", price: "", image: "" });
  };

  useEffect(() => {
    verifyAdminStatus();
    // getProducts();
  }, []);

  if (loading)
    return (
      <main className="min-h-screen w-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </main>
    );

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-3xl font-bold">24</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-3xl font-bold">156</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-3xl font-bold">$12,345</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button onClick={() => setShowAddProduct(!showAddProduct)}>
          {showAddProduct ? "Cancel" : "Add New Product"}
        </Button>
      </div>

      {showAddProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" name="desc" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" type="text" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Add Product</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <ProductList />
    </div>
  );
}
