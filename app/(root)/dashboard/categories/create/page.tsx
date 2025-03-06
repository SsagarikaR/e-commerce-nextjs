import AddCategories from "@/app/components/dashboard/AddCategories";
import React from "react";

function page() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between h-20 shadow-lg p-10 items-center">
        <div className="font-semibold text-3xl">Products</div>
      </div>
      <div className="mx-auto xl:w-3/5 md:w-4/5 ">
        <AddCategories />
      </div>
    </div>
  );
}

export default page;
