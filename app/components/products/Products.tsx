import React from "react";
import { product } from "@/constants";
import Pagination from "../pagination/Pagination";
import ProductCard from "./ProductCard";
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";
import SortBy from "./SortBy";

const fetchPaginatedProducts = async (
  category: string | null,
  price: string | null,
  name: string | null,
  page: number
) => {
  // Construct query parameters dynamically based on availability of `category` and `name`
  const queryParams = new URLSearchParams();
  if (category) queryParams.append("categoryID", category);
  if (name) queryParams.append("name", name);
  if (price) queryParams.append("price", price);
  queryParams.append("page", String(page));
  queryParams.append("limit", "8");

  const response = await unAuthorizedGetRequest(
    `products?${queryParams.toString()}`
  );

  console.log(`products?${queryParams.toString()}`);
  console.log(response, "product");
  return response;
};

const Products = async ({
  category,
  price,
  page,
  name,
}: {
  category: string;
  price: string;
  page: number;
  name: string;
}) => {
  // Fetch paginated data based on category and page
  const response = await fetchPaginatedProducts(category, price, name, page);
  let message;
  let products: products[];
  let totalPages;
  if (response.message) {
    message = response.message;
  } else {
    products = response;
    console.log(products);
    totalPages = Math.ceil(products[0].totalCount / 8);
  }
  const currentPage = page;
  return (
    <div className="flex w-screen justify-center items-center dark:text-white dark:bg-gray-700">
      {message ? (
        <div className="text-2xl">{message}</div>
      ) : (
        <div className="flex text-black flex-col ">
          <SortBy category={category} currentPage={currentPage} price={price} />
          {products! && products.length > 0 ? (
            <div className="flex flex-col px-5  w-full">
              <div className="flex w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 sm:gap-10 gap-y-8 place-items-center">
                  {products.map((product) => (
                    <ProductCard product={product} key={product.productID} />
                  ))}
                </div>
              </div>
              {/* Pagination Controls */}
              <Pagination
                category={category}
                currentPage={currentPage}
                totalPages={totalPages!}
              />
            </div>
          ) : (
            <div className="text-2xl text-center font-semibold  ">
              {product.NO_PRODUCT}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
