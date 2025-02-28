"use client"
import Link from "next/link";
  
  const Pagination = ({
    category,
    currentPage,
    totalPages,
  }: paginationProps) => {
    return (
      <div className="flex justify-center mt-6">
        {currentPage!==1 &&
        <Link href={`http://localhost:3000/products?category=${category || " "}&page=${currentPage-1}` } className="bg-purple-300 p-2 m-1 rounded-md border-gray-300 border">
          Previous
        </Link>}
        <span className="self-center text-xl">{`Page ${currentPage} of ${totalPages}`}</span>
        {currentPage!==totalPages &&
        <Link href={`http://localhost:3000/products?category=${category || " "}&page=${currentPage+1}`} className="bg-purple-300 p-2 m-1 rounded-md border-gray-300 border">
          Next
        </Link>}
      </div>
    );
  };
  
  export default Pagination;
  