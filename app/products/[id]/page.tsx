import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

export default function ProductDetails() {
  return (
    <div>
      <Header />
      <main className="px-2.5 min-h-[80vh]">
        <div className="flex mx-auto lg:w-[80%] gap lg:gap-10 flex-col lg:flex-row">
          <div className="flex-[2] mb-1 lg:mb-4 gap-2 flex flex-col ">
            <div className="flex-1">
              <Image
                alt="shoes"
                width={1500}
                height={1500}
                quality={100}
                src="/jordan.jpg"
                className="h-[300px] lg:h-[500px] rounded-xl w-full object-cover"
              />
            </div>
            <div className="flex flex-row  gap-2">
              <Image
                alt="shoes"
                width={160}
                height={160}
                quality={100}
                src="/jordan.jpg"
                className="lg:w-[60px] w-[70px] object-cover rounded-lg h-[60px] lg:h-[100px]"
              />
              <Image
                alt="shoes"
                width={160}
                height={160}
                quality={100}
                src="/jordan.jpg"
                className="lg:w-[60px] w-[70px] object-cover rounded-lg h-[60px] lg:h-[100px]"
              />
              <Image
                alt="shoes"
                width={160}
                height={160}
                quality={100}
                src="/jordan.jpg"
                className="lg:w-[60px] w-[70px] object-cover rounded-lg h-[60px] lg:h-[100px]"
              />
              <Image
                alt="shoes"
                width={160}
                height={160}
                quality={100}
                src="/jordan.jpg"
                className="lg:w-[60px] w-[70px] object-cover rounded-lg h-[60px] lg:h-[100px]"
              />
            </div>
          </div>
          <div className="flex-[1.6]">
            <h3 className="text-2xl lg:text-3xl font-semibold mb-1.5 lg:mb-2.5">
              Boa flece Jacket
            </h3>
            <p className="text-2xl mb-1.5 lg:text-4xl lg:mb-4 font-[700]">
              $122.00
            </p>
            <p className="text-base mb-1 font-[800]">Descriptions</p>
            <p className="text-base  mb-2 font-[500]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Doloremque exercitationem assumenda maxime alias rem porro fuga
              suscipit, esse corrupti ipsam adipisci voluptatem nostrum,
              distinctio eaque recusandae quia facilis vero? Alias iure
              reprehenderit temporibus iste impedit pariatur veniam dolore
              tempora velit?
            </p>
            <h3 className="text-base mb-2 font-[800]">Avaliable color</h3>
            <div className="flex mb-2 items-center flex-row gap-1.5 rounded-lg">
              <div className="w-8 h-8 border border-1 border-black rounded-lg bg-black"></div>
              <div className="w-8 h-8 border border-1 border-black rounded-lg bg-green-900"></div>
              <div className="w-8 h-8 border border-1 border-black rounded-lg bg-blue-800"></div>
            </div>
            <h3 className="text-base mb-2 font-[800]">Size</h3>
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
            <div className="flex w-full flex-col gap-2.5 justify-between">
              <button className="border text-base font-medium py-[5px] px-3 border-1 border-black rounded-lg">
                Add to cart
              </button>
              <button className="bg-black text-base font-medium py-[7px] px-3 text-white rounded-lg">
                Checkout now
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-[80%] mt-8 mb-4 mx-auto">
          <h3 className="text-2xl font-semibold mb-4">You may also like</h3>
          <div className="grid gap-y-4  grid-cols-2 justify-items-center lg:justify-items-start lg:grid-cols-4">
            <div className="w-[180px]">
              <Image
                width={500}
                height={500}
                className="lg:h-[200px] h-[160px] object-cover rounded-tr-md rounded-tl-md w-[150px] lg:w-[180px]"
                src="/jacket.jpg"
                alt="shirt"
              />
              <div>
                <p className="lg:text-base text-sm font-semibold">T Shirt</p>
                <p className="lg:text-base text-sm font-[500]">
                  Round collar T Shirt
                </p>
                <p className="font-[600]">$60</p>
              </div>
            </div>

            <div className="w-[180px]">
              <Image
                width={500}
                height={500}
                className="lg:h-[200px]  h-[160px] object-cover rounded-tr-md rounded-tl-md w-[150px] lg:w-[180px]"
                src="/jacket.jpg"
                alt="shirt"
              />
              <div>
                <p className="lg:text-base text-sm font-semibold">T Shirt</p>
                <p className="lg:text-base text-sm font-[500]">
                  Round collar T Shirt
                </p>
                <p className="font-[600]">$60</p>
              </div>
            </div>

            <div className="w-[180px]">
              <Image
                width={500}
                height={500}
                className="lg:h-[200px]  h-[160px] object-cover rounded-tr-md rounded-tl-md w-[150px] lg:w-[180px]"
                src="/jacket.jpg"
                alt="shirt"
              />
              <div>
                <p className="lg:text-base text-sm font-semibold">T Shirt</p>
                <p className="lg:text-base text-sm font-[500]">
                  Round collar T Shirt
                </p>
                <p className="font-[600]">$60</p>
              </div>
            </div>

            <div className="w-[180px]">
              <Image
                width={500}
                height={500}
                className="lg:h-[200px]  h-[160px] object-cover rounded-tr-md rounded-tl-md w-[150px] lg:w-[180px]"
                src="/jacket.jpg"
                alt="shirt"
              />
              <div>
                <p className="lg:text-base text-sm font-semibold">T Shirt</p>
                <p className="lg:text-base text-sm font-[500]">
                  Round collar T Shirt
                </p>
                <p className="font-[600]">$60</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
