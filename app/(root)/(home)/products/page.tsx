import Products from "@/app/components/products/Products";
import { Metadata } from "next";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: { category?: string; name?: string; page?: string };
}): Promise<Metadata> => {
  const category = searchParams.category || null;
  const name = searchParams.name || null;

  let title = "Shop Cart - Products";
  if (category) {
    title = `Shop Cart -Products (categoryID=${category}) `;
  } else if (name) {
    title = `Shop Cart - Search: ${name}`;
  }

  const description = category
    ? `Browse our ${category} products on Shop Cart.`
    : "This is the product page of Shop Cart, where you can find a wide variety of products.";

  return {
    title,
    description,
  };
};

const Page = async ({
  searchParams,
}: {
  searchParams: { category?: string; name?: string; page?: string };
}) => {
  const params = searchParams;
  const page = parseInt(params.page || "1", 10);
  const category = params.category || null;
  const name = params.name || null;

  // console.log("Category from query params:", category);

  return (
    <div className="pt-36 max-h-screen overflow-auto dark:bg-gray-700 min-h-screen">
      <Products category={category!} page={page!} name={name!} />
    </div>
  );
};

export default Page;
