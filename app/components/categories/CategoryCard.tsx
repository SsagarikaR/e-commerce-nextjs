import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryCard({
  id,
  categoryName,
  categoryThumbnail,
}: categoryCardProp) {
  return (
    <Link href={`/products?category=${id}`}>
      <div className=" flex flex-col justify-center items-center bg-transparent font-serif">
        <Image
          src={categoryThumbnail}
          alt={categoryName}
          width={250}
          height={250}
          className="w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] 2xl:w-[350px] 2xl:h-[350px] shadow-lg border transition-all duration-1000 hover:scale-95 object-cover"
        />
        <div className="text  text-xl font-semibold  dark:text-white">
          {categoryName}
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
