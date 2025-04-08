export default function Header() {
  return (
    <header className="mb-14">
      <div className="w-[90%] mx-auto">
        <div className="hidden  p-2 text-xs lg:text-sm justify-center font-medium items-center gap-4 flex-row">
          <p>
            New Season Coming! Discount 10% for all products! check out now!
          </p>
          {/* <button className="bg-neutral-950 rounded-md text-white text-xs px-1 py-1.5">
            20:48
          </button> */}
        </div>
        <div className="hidden  bg-white fixed top-0 left-0  md:flex z-[100] w-full text-black font-medium px-2 py-4 text-sm capitalize flex-row justify-between items-center">
          <div className="flex flex-row gap-8 items-center">
            <h3>Brand Logo</h3>
            <div className="flex gap-8 flex-row items-center">
              <p>categories</p>
              <p>collections</p>
              <p>blog</p>
            </div>
          </div>
          <div>
            <div className="flex flex-row  gap-8 items-center">
              <p>search</p>
              <p>cart</p>
              <p>login</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
