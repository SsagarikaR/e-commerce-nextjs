import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryCard({ _id, categoryName, categoryThumbnail }: categories) {
  return (
    <Link href={`/products?category=${_id}`}>
      <div className=" flex flex-col justify-center items-center bg-transparent font-serif">
        <Image
          src={categoryThumbnail}
          alt={categoryName}
          width={250}
          height={250}
          className="w-[250px] h-[250px] xl:w-[350px] xl:h-[350px]  shadow-lg border transition-all duration-1000 hover:scale-95 object-cover"
        />
        <div className="text  text-xl font-semibold text-gray-600 dark:text-white">
          {categoryName}
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
