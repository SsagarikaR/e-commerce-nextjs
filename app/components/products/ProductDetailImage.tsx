"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import WishlistIcon from "./WishlistIcon";
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest";

function ProductDetailImage({ product }: { product: products }) {
  const [productImage, setProductImage] = useState(
    product.products[0].productThumbnail
  );
  const addPrefernce = async () => {
    const response = await authorizedPostRequest("preferences", {
      productId: product.products[0]._id,
    });
    console.log(response);
  };
  useEffect(() => {
    addPrefernce();
  }, []);

  return (
    <div className="mx-auto sm:flex-row flex-col flex gap-x-7 relative sm:p-0 pb-20">
      <div className="flex sm:flex-col flex-row gap-3 sm:static absolute bottom-0  sm:p-0 p-2">
        {product.products[0].productImage1 && (
          <Image
            width={70}
            height={70}
            src={product.products[0].productImage1}
            alt="product image 1"
            className={`cursor-pointer w-[70px] h-[70px] sm:w-[100px] sm:h-[100px]  ${productImage === product.products[0].productImage1 ? "border-blue-400 border-4" : ""}`}
            onClick={() => {
              setProductImage(product.products[0].productImage1);
            }}
          />
        )}
        {product.products[0].productImage2 && (
          <Image
            width={70}
            height={70}
            src={product.products[0].productImage2}
            alt="product image 2"
            className={`cursor-pointer w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] ${productImage === product.products[0].productImage2 ? "border-blue-400 border-4" : ""}`}
            onClick={() => {
              setProductImage(product.products[0].productImage2);
            }}
          />
        )}
        {product.products[0].productImage3 && (
          <Image
            width={70}
            height={70}
            src={product.products[0].productImage3}
            alt="product image 3"
            className={`cursor-pointer w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] ${productImage === product.products[0].productImage3 ? "border-blue-400 border-4" : ""}`}
            onClick={() => {
              setProductImage(product.products[0].productImage3);
            }}
          />
        )}
        {product.products[0].productImage4 && (
          <Image
            width={70}
            height={70}
            src={product.products[0].productImage4}
            alt="product image 4"
            className={`cursor-pointer w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] ${productImage === product.products[0].productImage4 ? "border-blue-400 border-4" : ""}`}
            onClick={() => {
              setProductImage(product.products[0].productImage4);
            }}
          />
        )}
      </div>
      <div className="relative">
        <WishlistIcon productId={product.products[0]._id} />
        <div className="">
          <Image
            width={500}
            height={500}
            alt={product.products[0].productName}
            src={productImage}
            className="shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] xl:w-[600px] xl:h-[600px] "
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailImage;
