/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import SlidableBanner from "@/components/SlidableBanner";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <SlidableBanner />
      <main className="container mx-auto px-4 py-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1  text-center">
          New Arrivals
        </h2>
        <p className="text-sm font-normal leading-tight mb-4 text-center">
          our new arrivals are built to withstand your activities while keeping
          you looking your best!
        </p>
        <section className="w-full">
          <ProductGrid />
          <div className="w-full flex my-5 items-center justify-center">
            <Button
              size={"sm"}
              className="flex  rounded-3xl place-self-center my-3"
            >
              View more
            </Button>
          </div>
        </section>
        <section className="mt-10">
          <div className="flex gap-6 flex-col lg:flex-row">
            <div className="flex-[2]">
              <img
                src="/sales.jpg"
                className="h-[320px] rounded-xl w-full object-cover"
                alt="sales.jpg"
              />
            </div>
            <div className="flex-[1] pt-4">
              <h3 className="font-semibold  mb-5 text-gray-800 text-3xl leading-8">
                Find Your Perfect Look at Jolts Stylish New on Tokyo
              </h3>
              <p className="font-normal text-gray-800 leading-tight mb-4 text-sm">
                welcome to the newest jolt outlet in shibuya, japan! Step into
                our stylish and trendy store and discover the latest in cloth
                and apparel. come and experience the unique and vibrant
                atmosphere{" "}
              </p>
              <div>
                <h2 className="font-semibold mb-2 text-gray-800  text-xl">
                  come and enjoy sale!
                </h2>
                <p className="text-6xl text-gray-800 font-semibold">50%</p>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-10 h-fit w-full">
          <h3 className="font-semibold text-2xl text-gray-800 text-center">
            Featured Collection
          </h3>
          <p className="text-center text-gray-800 text-sm mb-6">
            Dare to mix and match! check out our collection to level up your
            fashion game
          </p>
          <div className="grid grid-cols-3  mb-4 gap-2 lg:gap-4 justify-between">
            <div className="flex gap-2 lg:gap-3 flex-col ">
              <img
                src="/footware.jpg"
                className="w-full rounded-xl  object-cover h-[200px] lg:h-[280px]"
                alt="shoe"
              />

              <img
                src="/cap.jpg"
                className="w-full  rounded-xl  object-cover h-[260px] lg:h-[400px]"
                alt="cap"
              />
            </div>
            <div className="flex gap-2 lg:gap-3 flex-col">
              <img
                src="/jacket.jpg"
                className="w-full rounded-xl  object-cover h-[260px] lg:h-[400px]"
                alt=""
              />

              <img
                src="/bag.jpg"
                className="w-full rounded-xl  object-cover h-[200px] lg:h-[280px]"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2 lg:gap-3">
              <img
                src="/watch.jpg"
                className="w-full rounded-xl  object-cover h-[200px] lg:h-[280px]"
                alt=""
              />

              <img
                src="/pant.jpg"
                className="w-full rounded-xl  object-cover h-[260px] lg:h-[400px]"
                alt=""
              />
            </div>
          </div>
        </section>
        <section>
          <p>news later</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
