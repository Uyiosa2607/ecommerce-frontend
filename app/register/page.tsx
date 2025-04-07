"use client";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  async function handleRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const data = {
      email,
      name,
      password,
    };

    if (password !== confirmPassword)
      return toast({
        variant: "destructive",
        description: "passwords do not match",
      });

    try {
      setLoading(true);
      const response = await axios.post(
        "https://shopping-backend-server-1.onrender.com/api/v1/auth/register",
        data
      );
      if (response.status === 201) {
        toast({
          description: "account was created successfully",
        });
        router.push("/login");
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log(error);
      toast({
        variant: "destructive",
        description: `${err.response?.data}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleRegistration}
        className="pt-20 flex items-center flex-col justify-center"
      >
        <Card className=" p-4 w-[80%] lg:w-[40%]">
          <div className="flex flex-col mb-3 gap-1.5">
            <Label>Name</Label>
            <Input
              name="name"
              placeholder="Enter Your name"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col mb-3 gap-1.5">
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter Your Email"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col mb-3 gap-1.5">
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter Your Password"
              type="password"
              required
            />
          </div>
          <div className="flex flex-col mb-3 gap-1.5">
            <Label>Confirm Password</Label>
            <Input
              placeholder="Confirm password"
              name="confirmPassword"
              type="password"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            Create account{" "}
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
          </Button>
        </Card>
      </form>
    </div>
  );
}
