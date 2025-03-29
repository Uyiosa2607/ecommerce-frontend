import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { useCartStore } from "@/lib/store";

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
}

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  const elements = Array.from({ length: 5 });
  const { addToCart } = useCartStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <Card
                key={product.id}
                className="overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-0 relative">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.img[0]}
                      alt={product.name}
                      width={300}
                      height={300}
                      quality={100}
                      className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                  </Link>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <Link
                    href={`/products/${product.id}`}
                    className="hover:text-purple-600 transition-colors"
                  >
                    <h2 className="text-sm truncate w-[100%] font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mb-4">${product.price}</p>
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </>
        )}
      </>
    </div>
  );
}
