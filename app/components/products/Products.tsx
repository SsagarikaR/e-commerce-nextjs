import React from "react";
import { product } from "@/constants";
import Pagination from "../pagination/Pagination";
import ProductCard from "./ProductCard";
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";

interface ProductsProps {
  category: string;
  price: string;
  page: number;
  name: string;
}

const fetchPaginatedProducts = async (
  category: string | null,
  price: string | null,
  name: string | null,
  page: number
): Promise<products | sqlProduct[]> => {
  const queryParams = new URLSearchParams();
  if (category) queryParams.append("categoryID", category);
  if (name) queryParams.append("name", name);
  if (price) queryParams.append("price", price);
  queryParams.append("page", String(page));
  queryParams.append("limit", "8");

  return await unAuthorizedGetRequest(`products?${queryParams.toString()}`);
};

// Type guard to check if response follows MongoDB's `products` structure
const isMongoDBResponse = (data: products | sqlProduct[]): data is products => {
  return "products" in data;
};

const Products = async ({ category, price, page, name }: ProductsProps) => {
  const response = await fetchPaginatedProducts(category, price, name, page);

  let message: string | undefined;
  let totalPages = 1;

  if (isMongoDBResponse(response)) {
    totalPages = Math.ceil(response.totalCount / 8);
  } else if (response.length > 0) {
    totalPages = Math.ceil(response[0].totalCount / 8);
  } else {
    message = "No products found.";
  }

  return (
    <div className="flex w-screen justify-center items-center dark:text-white dark:bg-gray-700">
      {message ? (
        <div className="text-2xl">{message}</div>
      ) : (
        <div className="flex text-black flex-col">
          {isMongoDBResponse(response) ? (
            response.products.length > 0 ? (
              <div className="flex flex-col px-5 w-full">
                <div className="flex w-full">
                  <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 sm:gap-10 gap-y-8 place-items-center">
                    {response.products.map((prod) => (
                      <ProductCard product={prod} key={prod._id} />
                    ))}
                  </div>
                </div>
                <Pagination
                  category={category}
                  currentPage={page}
                  totalPages={totalPages}
                />
              </div>
            ) : (
              <div className="text-2xl text-center font-semibold">
                {product.NO_PRODUCT}
              </div>
            )
          ) : response.length > 0 ? (
            <div className="flex flex-col px-5 w-full">
              <div className="flex w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 sm:gap-10 gap-y-8 place-items-center">
                  {response.map((prod) => (
                    <ProductCard product={prod} key={prod.productID} />
                  ))}
                </div>
              </div>
              <Pagination
                category={category}
                currentPage={page}
                totalPages={totalPages}
              />
            </div>
          ) : (
            <div className="text-2xl text-center font-semibold">
              {product.NO_PRODUCT}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
