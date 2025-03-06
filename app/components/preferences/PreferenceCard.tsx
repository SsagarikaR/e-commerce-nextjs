import Link from "next/link";
import React from "react";

function PreferenceCard({ item }: { item: prefernce }) {
  return (
    <>
      <Link href={`/products/${item.productID}`}>
        <div className="m-auto flex justify-center font-serif items-center flex-col text-gray-600 border p-4 gap-5 2xl:w-[350px] 2xl:h-[400px] sm:w-[350px] sm:h-[400px]">
          <img
            src={item.productThumbnail}
            alt={item.productName}
            className=" shadow-xl  w-full transition-transform duration-300 transform hover:scale-110"
          />
          <div className="flex flex-col justify-center items-center">
            <div className="text-lg font-bold dark:text-white">
              {item.productName}
            </div>
            <div className="text-lg font-semibold dark:text-white">
              ₹{item.productPrice}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PreferenceCard;
// transition-transform duration-300 transform hover:scale-110
