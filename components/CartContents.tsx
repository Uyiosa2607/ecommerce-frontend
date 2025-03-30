"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CartContents() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCartStore();

  const total = cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <div className="space-y-4 lg:space-y-8">
      {cart.map(function (item) {
        return (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-2 lg:p-6">
              <div className="flex gap-4 flex-row">
                <Image
                  src={item.img[0]}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md min-w-[90px] max-h-[80px]"
                />
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full">
                    <h3 className="text-sm lg:text-lg font-semibold w-[75%] truncate text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-purple-600 text-sm font-semibold">
                      ${item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={function () {
                        updateQuantity(item.id, item.quantity - 1);
                      }}
                      variant="outline"
                      size="icon"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-sm text-center font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      onClick={function () {
                        addToCart(item);
                      }}
                      variant="outline"
                      size="icon"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={function () {
                        removeFromCart(item.id);
                      }}
                      variant="ghost"
                      size="icon"
                      className="ml-4 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow">
        <p className="text-sm lg:text-base font-bold text-gray-800">
          Total: ${total.toFixed(2)}
        </p>
        <Button
          asChild
          size="default"
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
