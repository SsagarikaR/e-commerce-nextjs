"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import WishlistIcon from "./WishlistIcon";
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest";

// Type guards
function isMongoDBProduct(
  product: products | sqlProduct[]
): product is products {
  return (product as products).products !== undefined;
}

function ProductDetailImage({ product }: { product: products | sqlProduct[] }) {
  // Determine the correct product data
  const productData = isMongoDBProduct(product)
    ? product.products[0]
    : product[0];

  // Set initial image
  console.log(productData, "dattatat....");
  const [productImage, setProductImage] = useState(
    productData.productThumbnail
  );

  // Handle preference addition
  const addPrefernce = async () => {
    const response = await authorizedPostRequest("preferences", {
      productID: isMongoDBProduct(product)
        ? productData._id
        : productData.productID,
    });
    console.log(response);
  };

  useEffect(() => {
    addPrefernce();
  }, []);

  return (
    <div className="mx-auto sm:flex-row flex-col flex gap-x-7 relative sm:p-0 pb-20">
      <div className="flex sm:flex-col flex-row gap-3 sm:static absolute bottom-0 sm:p-0 pl-4">
        {productData.productImage1 && (
          <Image
            width={70}
            height={70}
            src={productData.productImage1}
            alt="product image 1"
            className={`cursor-pointer w-[70px] h-[70px] md:w-[90px] md:h-[90px] ${
              productImage === productData.productImage1
                ? "border-secondary border-4"
                : ""
            }`}
            onClick={() => setProductImage(productData.productImage1)}
          />
        )}
        {productData.productImage2 && (
          <Image
            width={70}
            height={70}
            src={productData.productImage2}
            alt="product image 2"
            className={`cursor-pointer w-[70px] h-[70px] md:w-[90px] md:h-[90px] ${
              productImage === productData.productImage2
                ? "border-secondary border-4"
                : ""
            }`}
            onClick={() => setProductImage(productData.productImage2)}
          />
        )}
        {productData.productImage3 && (
          <Image
            width={70}
            height={70}
            src={productData.productImage3}
            alt="product image 3"
            className={`cursor-pointer w-[70px] h-[70px] md:w-[90px] md:h-[90px] ${
              productImage === productData.productImage3
                ? "border-secondary border-4"
                : ""
            }`}
            onClick={() => setProductImage(productData.productImage3)}
          />
        )}
        {productData.productImage4 && (
          <Image
            width={70}
            height={70}
            src={productData.productImage4}
            alt="product image 4"
            className={`cursor-pointer w-[70px] h-[70px] md:w-[90px] md:h-[90px] ${
              productImage === productData.productImage4
                ? "border-secondary border-4"
                : ""
            }`}
            onClick={() => setProductImage(productData.productImage4)}
          />
        )}
      </div>
      <div className="relative">
        <WishlistIcon
          productID={
            isMongoDBProduct(product) ? productData._id : productData.productID
          }
        />
        <div className="">
          <Image
            width={500}
            height={500}
            alt={productData.productName}
            src={productImage}
            className="shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] xl:w-[600px] xl:h-[500px] 2xl:w-[600px] 2xl:h-[600px]"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailImage;
