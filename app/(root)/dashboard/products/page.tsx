import ProductList from "@/app/components/dashboard/ProductList";
import Link from "next/link";
import React from "react";

async function page({ searchParams }: { searchParams: { page?: string } }) {
  const params = await searchParams;

  // Parse the page number from query params, default to 1 if missing or invalid
  const page = parseInt(params.page || "1", 10);
  console.log(page);
  return (
    <div className="w-full flex flex-col">
      <div className="w-full  flex justify-between h-20 shadow-lg p-10 items-center">
        <div className="font-semibold text-3xl ">Products</div>
        <div>
          <Link
            href="/dashboard/products/create"
            className="bg-blue-400 px-10 py-2 text-lg font-semibold "
          >
            ADD+
          </Link>
        </div>
      </div>
      <div className="mx-auto xl:w-3/5 md:w-4/5 ">
        <ProductList page={page} />
      </div>
    </div>
  );
}

export default page;
