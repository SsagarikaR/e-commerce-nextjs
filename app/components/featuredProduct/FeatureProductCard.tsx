import React from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "../products/AddToCartBtn";

function FeatureProductCard({ item }: { item: product }) {
  return (
    <>
      <div className="m-auto  flex justify-center font-serif  items-center  mt-2 flex-col p-4  text-gray-600 bg-gray-100 pb-10 border-gray-400  gap-y-3  md:w-[250px] md:h-[350px]  xl:w-[280px] xl:h-[400px] rounded-lg   2xl:w-[320px] 2xl:h-[450px] sm:w-[300px] sm:h-[400px]">
        <Link href={`/products/${item._id}`}>
          <div className="w-full items-center flex justify-center">
            <Image
              width={200}
              height={200}
              src={item.productThumbnail}
              alt={item.productName}
              className=" shadow-xl w-[200px] h-[200px] md:w-[220px] md:h-[220px] lg:w-[200px] lg:h-[200px]  sm:w-[300px] sm:h-[300px]  xl:w-[280px] xl:h-[280px] object-cover transition-transform duration-1000 transform hover:scale-95"
            />
          </div>
        </Link>
        <div className="flex flex-col   gap-y-1">
          <div className="flex  gap-x-2">
            <Link href={`/products/${item._id}`}>
              <div className="text-sm sm:text-base font-bold text">
                {item.productName}
              </div>
              <div className="text-sm sm:text-base font-semibold ">
                (₹{item.productPrice})
              </div>
            </Link>
          </div>
        </div>

        <AddToCartBtn productID={item._id} />
      </div>
    </>
  );
}

export default FeatureProductCard;
