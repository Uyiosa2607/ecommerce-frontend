"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { api } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [admin, setAdmin] = useState<boolean>(false);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  async function getAuthRole() {
    try {
      const response = await api.get("/api/auth/get-auth");
      const isAdmin = response?.data?.user.isAdmin;
      if (isAdmin === true) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    getAuthRole();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
    // For now, let's navigate to a hypothetical search results page
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold transition-colors duration-300 
            text-gray-800"
          >
            TechMinimal
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-full transition-all duration-300 ${
                  isScrolled || !isHomePage
                    ? "bg-gray-100"
                    : "bg-white bg-opacity-20 backdrop-blur-md"
                } border-transparent focus:border-purple-300`}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Button type="submit" variant="ghost" size="sm" className="ml-2">
              Search
            </Button>
          </form>

          <nav className="hidden md:flex space-x-6">
            <Link
              href="/products"
              className={`transition-colors duration-300 ${
                isScrolled || !isHomePage
                  ? "text-gray-600 hover:text-purple-600"
                  : "text-white hover:text-purple-200"
              }`}
            >
              Products
            </Link>
            <Link
              href="/dashboard"
              className={`transition-colors duration-300 ${
                isScrolled || !isHomePage
                  ? "text-gray-600 hover:text-purple-600"
                  : "text-white hover:text-purple-200"
              }`}
            >
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="relative"
                >
                  <User
                    className={`h-[20px] w-[20px] transition-colors duration-300 ${
                      isScrolled || !isHomePage ? "text-gray-600" : "text-white"
                    }`}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-4">
                  {admin ? (
                    <Button asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                  ) : null}
                  <Button variant="destructive">Logout</Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart
                  className={`h-5 w-5 transition-colors duration-300 ${
                    isScrolled || !isHomePage ? "text-gray-600" : "text-white"
                  }`}
                />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu
                    className={`h-5 w-5 transition-colors duration-300 ${
                      isScrolled || !isHomePage ? "text-gray-600" : "text-white"
                    }`}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <Link href="/" className="text-lg font-semibold">
                    Home
                  </Link>
                  <Link href="/products" className="text-lg font-semibold">
                    Products
                  </Link>
                  <Link href="/dashboard" className="text-lg font-semibold">
                    Dashboard
                  </Link>
                  <Link href="/cart" className="text-lg font-semibold">
                    Cart
                  </Link>
                </nav>
                <form onSubmit={handleSearch} className="mt-6">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-full"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <Button type="submit" className="mt-2 w-full">
                    Search
                  </Button>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
