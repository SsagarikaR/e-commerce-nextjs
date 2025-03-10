import Products from "@/app/components/products/Products";
import { Metadata } from "next";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: { category?: string; name?: string; page?: string };
}): Promise<Metadata> => {
  const category = (await searchParams.category) || null;
  const name = (await searchParams.name) || null;

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
  searchParams: {
    category?: string;
    price?: string;
    name?: string;
    page?: string;
  };
}) => {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const price = params.price || null;
  const category = params.category || null;
  const name = params.name || null;

  // console.log("Category from query params:", category);

  return (
    <div className="pt-36 max-h-screen overflow-auto dark:bg-gray-700 min-h-screen">
      <Products category={category!} price={price!} page={page!} name={name!} />
    </div>
  );
};

export default Page;
