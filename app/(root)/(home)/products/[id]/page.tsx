import ProductDetailPage from "@/app/components/products/ProductDetail";
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";
import { Metadata } from "next";

const fetchProductDetails = async (id: string) => {
  const response = await unAuthorizedGetRequest(`/products?id=${id}`);
  return response;
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { id } = params;

  const product = await fetchProductDetails(id);
  console.log(product, "product.....product");
  const title = product
    ? `Shop Cart - ${process.env.DATABASE === "mongodb" ? product.products[0].productName : product[0].productName} Details`
    : "Shop Cart - Product Details";
  const description = product
    ? `Explore the details of ${process.env.DATABASE === "mongodb" ? product.products[0].productName : product[0].productName} on Shop Cart. Price: ${process.env.DATABASE === "mongodb" ? product.products[0].productPrice : product.productPrice}, Description: ${process.env.DATABASE === "mongodb" ? product.products[0].productDescription : product.productDescription}`
    : "This is the product detail page where you can find all details about the product.";

  return {
    title,
    description,
  };
};

async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="w-screen pt-20 min-h-screen max-h-screen overflow-auto dark:bg-gray-700">
      <ProductDetailPage id={id} />
    </div>
  );
}

export default page;
