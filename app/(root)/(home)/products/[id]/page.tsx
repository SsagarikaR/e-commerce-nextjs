import ProductDetailPage from "@/app/components/products/ProductDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Cart - Product Detail", // Title for the page
  description:
    "This is the product detail page where you can find all details about the product.",
};

async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div className="w-screen pt-20">
      <ProductDetailPage id={id} />
    </div>
  );
}

export default page;
