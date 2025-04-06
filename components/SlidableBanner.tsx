"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const bannerItems = [
  {
    id: 1,
    title: "Summer Tech Sale",
    description: "Up to 50% off on selected items",
    image: "/banner.jpg",
    link: "/products",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our latest gadgets",
    image: "/banner.jpg",
    link: "/products",
  },
  {
    id: 3,
    title: "Limited Time Offer",
    description: "Free shipping on orders over $500",
    image: "/banner.jpg",
    link: "/products",
  },
];

export default function SlidableBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerItems.length) % bannerItems.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[240px]  md:h-[400px] overflow-hidden">
      {bannerItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {item.title}
              </h2>
              <p className="text-base md:text-xl mb-6">{item.description}</p>
              <Button asChild variant="secondary">
                <a href={item.link}>Shop Now</a>
              </Button>
            </div>
          </div>
        </div>
      ))}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  );
}
