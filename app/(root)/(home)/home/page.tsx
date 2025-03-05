import Category from "@/app/components/categories/Category";
import Preferences from "@/app/components/preferences/Preferences";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Cart-home",
  description:
    "This is home page of shop cart. it display preference of user and all products categories",
};

function page() {
  return (
    <div className="w-full max-h-screen overflow-auto dark:bg-gray-700 ">
      <Category />
      <Preferences />
    </div>
  );
}

export default page;
