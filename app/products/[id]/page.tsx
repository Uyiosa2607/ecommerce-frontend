// "use client";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import ProductDetails from "@/components/ProductDetails";
// import { useParams } from "next/navigation";

// export default function ProductPage() {
//   const params = useParams();
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
//       <Header />
//       <main className="flex-grow container mx-auto px-4 py-12">
//         <ProductDetails id={String(params.id)} />
//       </main>
//       <Footer />
//     </div>
//   );
// }

export default function ProductDetails() {
  return (
    <main>
      <p>details page</p>
    </main>
  );
}
