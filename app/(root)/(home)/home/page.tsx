import Category from "@/app/components/categories/Category";
import Preferences from "@/app/components/preferences/Preferences";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";
import FeatureProductCard from "@/app/components/featuredProduct/FeatureProductCard";

const fetcher = async () => {
  const reponse = await unAuthorizedGetRequest("products");
  return reponse;
};

export const metadata: Metadata = {
  title: "Shop Cart-home",
  description:
    "This is home page of shop cart. it display preference of user and all products categories",
};

async function page() {
  const products: products = await fetcher();
  return (
    <div className="w-full max-h-screen overflow-auto dark:bg-gray-700  min-h-screen">
      <Category />
      <div className=" md:hidden border-b border-gray-400 pt-10 px-2 mx-4"></div>
      <Preferences />
      {products! && products.products.length > 0 && (
        <section className=" dark:bg-gray-700 xl:px-36  pt-10 flex flex-col gap-y-1 md:px-10 px-0 ">
          <div className=" text-3xl flex flex-col gap-y-3  text-center font-serif  mb-2 text-gray-700 dark:text-white">
            <h2 className="text-3xl font-serif tracking-wider font-semibold">
              Featured Products
            </h2>
          </div>

          <div className="flex flex-col   w-ful justify-center items-center">
            <div className="flex w-full justify-center items-center">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-10 gap-y-8 place-items-center">
                {products.products.map((product) => (
                  <FeatureProductCard item={product} key={product._id} />
                ))}
              </div>
            </div>
            {/* Pagination Controls */}
          </div>

          <div className="flex justify-center mt-4">
            <Link
              href="/products"
              className="bg-blue-400  px-4 py-2 rounded-lg hover:bg-blue-500"
            >
              Show All
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default page;
