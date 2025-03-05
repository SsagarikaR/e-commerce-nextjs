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
        <img
          src={categoryThumbnail}
          className="w-[250px] h-[250px] xl:w-[300px] xl:h-[300px]  shadow-lg border transition-transform duration-300 hover:scale-95"
        />
        <div className="font-serif text-xl font-semibold text-gray-600 dark:text-white">
          {categoryName}
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
