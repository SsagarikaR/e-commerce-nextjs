import Link from "next/link";
import React from "react";

function PreferenceCard({ item }: { item: prefernce }) {
  return (
    <Link href={`/products/${item.productID}`}>
      <div className="flex justify-center items-center flex-col text-gray-600 border p-4 gap-5">
        <img
          src={item.productThumbnail}
          className="  shadow-xl transition-transform duration-300 transform hover:scale-110"
        />
        <div className="flex flex-col justify-center items-center">
          <div className="text-md font-semibold dark:text-white">
            {item.productName}
          </div>
          <div className="text-md font-semibold dark:text-white">
            ₹{item.productPrice}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PreferenceCard;
