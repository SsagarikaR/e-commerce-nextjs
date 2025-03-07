import CategoryList from "@/app/components/dashboard/CategoryList";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="w-full  flex flex-col">
      <div className="w-full  flex justify-between h-20 shadow-lg p-10 items-center">
        <div className="font-semibold text-3xl">Categories</div>
        <Link
          href="/dashboard/categories/create"
          className="bg-blue-400 px-10 py-2 text-lg font-semibold"
        >
          ADD+
        </Link>
      </div>
      <div className="mx-auto xl:w-3/5 md:w-4/5 ">
        <CategoryList />
      </div>
    </div>
  );
}

export default page;
