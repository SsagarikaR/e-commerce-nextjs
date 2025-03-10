import Wishlist from "@/app/components/wishlist/Wishlist";
import React from "react";

function page() {
  return (
    <div className="pt-32 min-w-screen min-h-screen bg-gradient-to-r from-gray-200 to-blue-200 dark:bg-gray-700">
      <Wishlist />
    </div>
  );
}

export default page;
