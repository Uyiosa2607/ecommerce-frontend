"use client";

import { useState, useEffect, FormEvent } from "react";
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
import { api } from "@/lib/utils";

export default function DashboardContent() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [spec, setSpec] = useState<string>("");
  const [feature, setFeature] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const router = useRouter();

  async function verifyAdminStatus() {
    setLoading(true);
    try {
      const getUser = await api.get("/api/auth/get-auth");
      const isAdmin = getUser.data?.user?.isAdmin;
      if (isAdmin !== true) {
        console.log("user is not admin, cant access route");
        return router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const desc = formData.get("desc") as string;
    const price = Number(formData.get("price"));
    const img = image.split(",").map((tag) => tag.trim());
    const specs = spec.split(",").map((tag) => tag.trim());
    const features = feature.split(",").map((tag) => tag.trim());

    const data = {
      name,
      desc,
      price,
      img,
      specs,
      features,
    };

    try {
      const response = await api.post("/api/products/add-product", data);
      if (response.status === 201) {
        console.log(response);
        return setShowAddProduct(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyAdminStatus();
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
                <Label htmlFor="specs">Specs (comma-separated)</Label>
                <Input
                  id="specs"
                  onChange={(event) => setSpec(event.target.value)}
                  type="text"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feature">features (comma-separated)</Label>
                <Input
                  id="features"
                  onChange={(event) => setFeature(event.target.value)}
                  type="text"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URLS (comma-separated)</Label>
                <Input
                  id="image"
                  onChange={(event) => setImage(event.target.value)}
                  name="image"
                  type="text"
                  required
                />
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
