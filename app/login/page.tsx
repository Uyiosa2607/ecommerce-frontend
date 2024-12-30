"use client";

import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const data = {
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:4001/api/auth/login",
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast({
          description: "login successfull",
        });
        router.push("/");
        return;
      }
    } catch (error) {
      const err = error as AxiosError;
      toast({
        variant: "destructive",
        description: `${err?.response?.data}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleLogin}
        className="pt-20 flex items-center flex-col justify-center"
      >
        <h3 className="font-medium mb-4 text-lg">Welcome</h3>
        <Card className="p-4 w-[90%] lg:w-[40%]">
          <div className="flex gap-1.5 mb-3 flex-col">
            <Label>Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Password</Label>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Enter your Password"
              required
            />
          </div>
          <Button type="submit" className="my-5 w-full">
            Login{" "}
            {loading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : null}
          </Button>
        </Card>
      </form>
    </div>
  );
}
