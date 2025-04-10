import { CircleUser, Menu, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mb-14 z-[200]">
      <div className="w-full fixed top-0 left-0 mx-auto">
        <div className="bg-stone-100 flex md:flex w-full text-black font-medium px-2 py-2.5 lg:py-4 text-sm capitalize flex-row justify-between items-center">
          <div className="flex flex-row gap-8 items-center">
            <Link href="/">
              <h3 className="text-lg font-semibold">Brand Logo</h3>
            </Link>
            <div className="hidden lg:flex font-semibold gap-8 flex-row items-center">
              <p>categories</p>
              <p>collections</p>
              <p>blog</p>
            </div>
          </div>

          <div className="flex flex-row items-center">
            <div className="hidden lg:flex flex-row font-semibold  gap-8 items-center">
              <div className="flex items-center gap-1 flex-row">
                <Search size={18} />
                <p>search</p>
              </div>
              <Link href="/cart">
                <div className="flex items-center gap-1 flex-row">
                  <ShoppingBag size={18} />
                  <p>cart</p>
                </div>
              </Link>
              <Link href="/login">
                <div className="flex flex-row items-center gap-1">
                  <CircleUser size={18} />
                  <p>login</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center flex-row gap-6">
              <Search className="lg:hidden w-5 h-5 lg:h-8 lg:w-8" />
              <Link href="/cart">
                <ShoppingBag className="lg:hidden w-5 h-5 lg:h-8 lg:w-8" />
              </Link>
              <Menu className="lg:hidden" size={30} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
