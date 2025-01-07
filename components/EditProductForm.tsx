/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string[];
  specs: string[];
  features: string[];
}

interface EditProductFormProps {
  product: Product;
  onSave: () => void;
  onCancel: () => void;
}

export default function EditProductForm({
  product,
  onSave,
  onCancel,
}: EditProductFormProps) {
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [feature, setFeature] = useState<string>(
    editedProduct.features.join(", ")
  );
  const [spec, setSpecs] = useState<string>(editedProduct.specs.join(", "));
  const [image, setImage] = useState<string>(editedProduct.img.join(", "));

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
      const response = await api.patch(
        `/api/products/${editedProduct.id}`,
        data
      );
      if (response.status === 200) return onSave();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={editedProduct.name}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              name="desc"
              defaultValue={editedProduct.desc}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              defaultValue={editedProduct.price}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specs">Specs (comma-separated)</Label>
            <Input
              id="specs"
              onChange={(event) => setSpecs(event.target.value)}
              type="text"
              defaultValue={editedProduct.specs.join(", ")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feature">Features (comma-separated)</Label>
            <Input
              id="features"
              onChange={(event) => setFeature(event.target.value)}
              type="text"
              defaultValue={editedProduct.features.join(", ")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URLS (comma-separated)</Label>
            <Input
              id="image"
              name="image"
              type="text"
              onChange={(event) => setImage(event.target.value)}
              defaultValue={editedProduct.img.join(", ")}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
