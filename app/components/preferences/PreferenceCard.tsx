import Image from "next/image";
import Link from "next/link";
import React from "react";

function PreferenceCard({ item }: { item: prefernce }) {
  return (
    <>
      <Link href={`/products/${item.productID}`}>
        <div className="m-auto  flex justify-center font-serif  items-center  mt-2 flex-col p-4 pt-8 text-gray-600 bg-gray-300 pb-10 border-gray-400  gap-y-2 lg:w-[300px] lg:h-[400px] md:w-[250px] md:h-[400px]  sm:w-[300px] sm:h-[400px]">
          <div className="w-full">
            <Image
              width={200}
              height={200}
              src={item.productThumbnail}
              alt={item.productName}
              className=" shadow-xl w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]  object-cover transition-transform duration-1000 transform hover:scale-95"
            />
          </div>
          <div className="flex flex-col   gap-y-1">
            <div className="flex  gap-x-2">
              <div className="text-base sm:text-lg font-bold text">
                {item.productName}
              </div>
              <div className="text-base sm:text-lg font-semibold ">
                (₹{item.productPrice})
              </div>
            </div>
            <div className="text-sm  flex  break-words">
              {item.productDescription.split(" ").slice(0, 12).join(" ")}
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
