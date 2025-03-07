import Image from "next/image";
import Link from "next/link";
import React from "react";

function PreferenceCard({ item }: { item: prefernce }) {
  return (
    <>
      <Link href={`/products/${item.productID}`}>
        <div className="m-auto flex justify-center font-serif  items-center transition-transform duration-300 transform hover:scale-95 mt-2 flex-col p-4 pt-8 text-gray-600 bg-gray-200 pb-10 border-gray-400  gap-y-2 2xl:w-[350px] 2xl:h-[400px] sm:w-[350px] sm:h-[400px]">
          <div className="w-full">
            <Image
              width={200}
              height={200}
              src={item.productThumbnail}
              alt={item.productName}
              className=" shadow-xl  w-full  object-cover"
            />
          </div>
          <div className="flex flex-col   gap-y-1">
            <div className="flex  gap-x-2">
              <div className="text-lg font-bold dark:text-white">
                {item.productName}
              </div>
              <div className="text-lg font-semibold dark:text-white">
                (₹{item.productPrice})
              </div>
            </div>
            <div className="text-sm  flex i">
              {
                item.productDescription
                  .split(" ") // Split the description into words
                  .slice(0, 12) // Take only the first 15 words
                  .join(" ") // Join the words back into a string
              }
              ...
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PreferenceCard;
// transition-transform duration-300 transform hover:scale-110
