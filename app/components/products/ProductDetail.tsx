import React from "react";

import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";
import FetchReview from "../review/FetchReview";
import AddToCartBtn from "./AddToCartBtn";
import Image from "next/image";
import ProductDetailImage from "./ProductDetailImage";

export const fetchProducts = async (id: string) => {
  const data = await unAuthorizedGetRequest(`/products?id=${id}`);
  return data;
};

async function ProductDetailPage({ id }: { id: string }) {
  const product = await fetchProducts(id);

  // Loading state
  if (!product) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="flex items-center justify-center  font-serif ">
      {/* Render product details if product is available */}
      <div className="flex p-20 gap-10 flex-col lg:flex-row">
        <ProductDetailImage product={product} />
        <div className=" w-[400px] md:w-[500px] lg:w-[400px] xl:w-[500px] dark:text-white text-gray-700 gap-y-9 flex flex-col m-auto pl-10 lg:p-0">
          <div className="flex gap-y-4 flex-col  ">
            <div className="flex gap-x-3">
              <div className="text-3xl font-semibold">
                {product[0].productName}
              </div>
              <Image
                width={100}
                height={100}
                alt={product[0].brandName}
                src={product[0].brandThumbnail}
                className="w-10 h-10 rounded-full border "
              />
            </div>
            <div className="text-2xl font-normal">
              ₹{product[0].productPrice}
            </div>
            <div className=" border-b border-gray-300  md:w-[500px] xl:w-[500px]"></div>
          </div>
          <div className="text-justify text-lg">
            {product[0].productDescription}
          </div>
          <div className="flex flex-col gap-y-2 pb-6">
            <AddToCartBtn productID={product[0].productID} />
          </div>
          <FetchReview id={product[0].productID} rating={product[0].rating} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
