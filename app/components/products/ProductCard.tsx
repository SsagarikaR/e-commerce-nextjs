import React from "react";
import AddToCartBtn from "./AddToCartBtn";
import WishlistIcon from "./WishlistIcon";
import Link from "next/link";
import Image from "next/image";

function isMongoProduct(product: product | sqlProduct): product is product {
  return typeof product.brandID !== "number";
}

async function ProductCard({ product }: { product: product | sqlProduct }) {
  console.log(product, "product....");
  console.log(product._id, "product id.....");

  // Extract brand details correctly based on product type
  const brandThumbnail = isMongoProduct(product)
    ? product.brandID.brandThumbnail
    : product.brandThumbnail; // SQL stores it directly

  const brandName = isMongoProduct(product)
    ? product.brandID.brandName
    : product.brandName; // SQL stores it directly

  const productTD = isMongoProduct(product) ? product._id : product.productID;

  return (
    <div className="flex flex-col gap-y-2 w-full shadow-2xl p-2 relative mx-auto dark:bg-gray-300">
      <WishlistIcon productID={productTD} />
      <div className="gap-y-2 flex flex-col">
        <Link href={`/products/${productTD}`}>
          <Image
            alt={product.productName}
            width={300}
            height={300}
            src={product.productThumbnail}
            className="cursor-pointer xl:w-[400px] xl:h-[400px] lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] sm:w-[300px] sm:h-[300px] h-[220px] w-[220px] shadow-md"
          />
        </Link>
        <div className="flex items-center justify-center sm:gap-x-2 gap-x-1">
          <Link href={`/products/${product._id}`}>
            <div className="text-center sm:text-base text-sm font-semibold text-gray-700 cursor-pointer">
              {product.productName}
            </div>
          </Link>
          <Image
            width={100}
            height={100}
            src={brandThumbnail}
            alt={brandName}
            className="h-8 w-8 rounded-full border shadow-md"
          />
        </div>
        <div className="text-center ">₹{product.productPrice}</div>
      </div>
      <AddToCartBtn productID={productTD} />
    </div>
  );
}

export default ProductCard;
