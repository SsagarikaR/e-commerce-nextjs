import Products from "@/app/components/products/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Cart-prodcuts",
  description: "This is the product page of shop cart",
};
const Page = async ({
  searchParams,
}: {
  searchParams: { category?: string; name?: string; page?: string };
}) => {
  const params = await searchParams;

  const page = parseInt(params.page || "1", 10);

  const category = params.category || null;

  const name = params.name || null;

  console.log("Category from query params:", category);

  return (
    <div className="pt-36 max-h-screen overflow-auto">
      <Products category={category!} page={page!} name={name!} />
    </div>
  );
};

export default Page;
