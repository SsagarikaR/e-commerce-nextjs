import Category from "@/app/components/categories/Category";
import Preferences from "@/app/components/preferences/Preferences";
import React from "react";
import { Metadata } from "next";
import FeaturedProduct from "@/app/components/featuredProduct/FeaturedProduct";

export const metadata: Metadata = {
  title: "Shop Cart-home",
  description:
    "This is home page of shop cart. it display preference of user and all products categories",
};

async function page() {
  return (
    <div className="w-full  overflow-auto dark:bg-gray-700 min-h-screen">
      <Category />
      <div className="md:hidden border-b border-gray-400 pt-10 px-2 mx-4"></div>
      <Preferences />
      <FeaturedProduct />
      <div className="h-10"></div>
    </div>
  );
}

export default page;
