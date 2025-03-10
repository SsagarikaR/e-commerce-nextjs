import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryCard({
  categoryID,
  categoryName,
  categoryThumbnail,
}: categories) {
  return (
    <Link href={`/products?category=${categoryID}`}>
      <div className=" flex flex-col justify-center items-center bg-transparent">
        <Image
          src={categoryThumbnail}
          alt={categoryName}
          width={250}
          height={250}
          className="w-[250px] h-[250px] xl:w-[300px] xl:h-[300px]  shadow-lg border transition-all duration-1000 hover:scale-95 object-cover"
        />
        <div className="text  text-xl font-semibold text-gray-600 dark:text-white">
          {categoryName}
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
