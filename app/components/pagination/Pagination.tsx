"use client";
import { pagination } from "@/constants";
import Link from "next/link";

const Pagination = ({ category, currentPage, totalPages }: paginationProps) => {
  return (
    <div className="flex justify-center mt-6 dark:text-white">
      {currentPage !== 1 && (
        <Link
          href={
            category
              ? `http://localhost:3000/products?category=${category || " "}&page=${currentPage - 1}`
              : `http://localhost:3000/dashboard/products?page=${currentPage - 1}`
          }
          className="bg-purple-300 p-2 m-1 rounded-md border-gray-300 border"
        >
          {pagination.PREVIOUS}
        </Link>
      )}
      <span className="self-center text-xl">{`Page ${currentPage} of ${totalPages}`}</span>
      {currentPage !== totalPages && (
        <Link
          href={
            category
              ? `http://localhost:3000/products?category=${category || " "}&page=${currentPage + 1}`
              : `http://localhost:3000/dashboard/products?page=${currentPage + 1}`
          }
          className="bg-purple-300 p-2 m-1 rounded-md border-gray-300 border"
        >
          {pagination.NEXT}
        </Link>
      )}
    </div>
  );
};

export default Pagination;
