import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

export default function ProductDetails() {
  return (
    <div>
      <Header />
      <main className="px-2 min-h-[80vh]">
        <div className="flex mx-auto gap-6 flex-col lg:flex-row">
          <div className="flex-[2] gap-2 flex flex-col lg:flex-row">
            <div className="flex-1">
              <Image
                alt="shoes"
                width={1500}
                height={1500}
                quality={100}
                src="/jordan.jpg"
                className="h-[500px] rounded-xl w-full object-cover"
              />
            </div>
            <div className="flex flex-row lg:flex-col gap-2">
              <Image
                alt="shoes"
                width={160}
                height={160}
                quality={100}
                src="/jordan.jpg"
                className="w-[100px] object-cover rounded-lg h-[100px]"
              />
              <Image
                alt="shoes"
                width={160}
                height={160}
                quality={100}
                src="/jordan.jpg"
                className="w-[100px] object-cover rounded-lg h-[100px]"
              />
              <Image
                alt="shoes"
                width={160}
                height={160}
                quality={100}
                src="/jordan.jpg"
                className="w-[100px] object-cover rounded-lg h-[100px]"
              />
              <Image
                alt="shoes"
                width={160}
                height={160}
                quality={100}
                src="/jordan.jpg"
                className="w-[100px] object-cover rounded-lg h-[100px]"
              />
            </div>
          </div>
          <div className="flex-[1]">
            <h3 className="text-3xl font-semibold mb-2.5">Boa flece Jacket</h3>
            <p className="text-3xl mb-4 font-[500]">$122.00</p>
            <p className="text-base mb-1 font-[700]">Descriptions</p>
            <p className="text-sm mb-2 font-[400]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Doloremque exercitationem assumenda maxime alias rem porro fuga
              suscipit, esse corrupti ipsam adipisci voluptatem nostrum,
              distinctio eaque recusandae quia facilis vero? Alias iure
              reprehenderit temporibus iste impedit pariatur veniam dolore
              tempora velit?
            </p>
            <h3 className="text-base mb-2 font-[600]">avaliable color</h3>
            <div className="flex mb-2 items-center flex-row gap-1.5 rounded-lg">
              <div className="w-8 h-8 border border-1 border-black rounded-lg bg-black"></div>
              <div className="w-8 h-8 border border-1 border-black rounded-lg bg-green-900"></div>
              <div className="w-8 h-8 border border-1 border-black rounded-lg bg-blue-800"></div>
            </div>
            <h3 className="text-base mb-2 font-[600]">Size</h3>
            <div className="flex text-sm mb-4  gap-1.5 flex-row font-medium">
              <div className="w-8 flex items-center justify-center rounded-md border border-1 border-black h-8">
                <p>M</p>
              </div>
              <div className="w-8 flex items-center justify-center rounded-md border border-1 border-black h-8">
                <p>L</p>
              </div>
              <div className="w-8 flex items-center justify-center rounded-md border border-1 border-black h-8">
                <p>XL</p>
              </div>
            </div>
            <div className="flex w-[60%] items-center justify-between">
              <button className="border py-1.5 px-3 border-1 border-black rounded-lg">
                Add to cart
              </button>
              <button className="bg-black py-1.5 px-3 text-white rounded-lg">
                Checkout now
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
