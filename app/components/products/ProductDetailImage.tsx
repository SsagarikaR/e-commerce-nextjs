"use client";
import React, { useState } from "react";
import Image from "next/image";
import WishlistIcon from "./WishlistIcon";
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest";

function ProductDetailImage({ product }: { product: products[] }) {
  const [productImage, setProductImage] = useState(product[0].productThumbnail);
  const addPrefernce = async () => {
    const response = await authorizedPostRequest("preferences", {
      productID: product[0].productID,
    });
    console.log(response);
  };
  addPrefernce();

  return (
    <div className="mx-auto flex gap-x-7">
      <div className="flex flex-col gap-3">
        {product[0].productImage1 && (
          <Image
            width={90}
            height={90}
            src={product[0].productImage1}
            alt="product image 1"
            className={`cursor-pointer ${productImage === product[0].productImage1 ? "border-green-400 border-4" : ""}`}
            onClick={() => {
              setProductImage(product[0].productImage1);
            }}
          />
        )}
        {product[0].productImage2 && (
          <Image
            width={90}
            height={90}
            src={product[0].productImage2}
            alt="product image 2"
            className={`cursor-pointer ${productImage === product[0].productImage2 ? "border-green-400 border-4" : ""}`}
            onClick={() => {
              setProductImage(product[0].productImage2);
            }}
          />
        )}
        {product[0].productImage3 && (
          <Image
            width={90}
            height={90}
            src={product[0].productImage3}
            alt="product image 3"
            className={`cursor-pointer ${productImage === product[0].productImage3 ? "border-green-400 border-4" : ""}`}
            onClick={() => {
              setProductImage(product[0].productImage3);
            }}
          />
        )}
        {product[0].productImage4 && (
          <Image
            width={90}
            height={90}
            src={product[0].productImage4}
            alt="product image 4"
            className={`cursor-pointer ${productImage === product[0].productImage4 ? "border-green-400 border-4" : ""}`}
            onClick={() => {
              setProductImage(product[0].productImage4);
            }}
          />
        )}
      </div>
      <div>
        <WishlistIcon productID={Number(product[0].productID)} />
        <div className="">
          <Image
            width={500}
            height={500}
            alt={product[0].productName}
            src={productImage}
            className="shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] w-80 h-80 sm:w-100 sm:h-100 md:w-150 md:h-150 xl:w-[500px] xl:h-[500px] "
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailImage;
