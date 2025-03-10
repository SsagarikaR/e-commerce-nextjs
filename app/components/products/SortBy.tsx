import React from "react";
import Link from "next/link";

function SortBy({
  category,
  currentPage,
  price,
}: {
  category: string;
  currentPage: number;
  price: string;
}) {
  return (
    <div className="relative group">
      {/* Dropdown Trigger */}
      <div className="flex gap-x-4 text-gray-700 font-bold items-center pl-6">
        <div className="   py-2 px-4 rounded-md border-2 border-gray-300 hover:bg-gray-100 flex items-center gap-x-2 ">
          Sort by price ▼
        </div>
      </div>

      {/* Dropdown Menu (hidden by default) */}
      <div className="absolute left-0 mt-2 w-48 z-20 bg-white shadow-2xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-200">
        <div className="text-gray-600 text-sm">
          <Link
            href={`/products?category=${category || " "}&price=low-to-high&page=${currentPage}`}
          >
            <div
              className={`cursor-pointer p-2 hover:bg-gray-100 ${
                price === "low-to-high" ? "text-blue-600" : "text-gray-600"
              }`}
            >
              low-to-high
            </div>
          </Link>
          <Link
            href={`/products?category=${category || " "}&price=high-to-low&page=${currentPage}`}
          >
            <div
              className={`cursor-pointer p-2 hover:bg-gray-100 ${
                price === "high-to-low" ? "text-blue-600" : "text-gray-600"
              }`}
            >
              high-to-low
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SortBy;
