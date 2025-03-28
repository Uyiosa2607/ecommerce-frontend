"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/lib/utils";
import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";

export default function CheckoutForm() {
  const [loading, setLoading] = useState<boolean>(false);
  async function testPay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const amount = formData.get("amount");

    const data = {
      email,
      amount,
    };
    try {
      setLoading(true);
      const response = await api.post("/api/pay/initialize-payment", data);
      if (response.status === 200) {
        setLoading(false);
        window.location.href = response.data?.data?.authorization_url;
      }
      console.log(response.data?.data?.authorization_url);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={testPay}>
      <Card>
        <CardContent className="grid gap-6 p-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">amount</Label>
            <Input id="amount" name="amount" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input id="zipCode" name="zipCode" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Place Order{" "}
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
