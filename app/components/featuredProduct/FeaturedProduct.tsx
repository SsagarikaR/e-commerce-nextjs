import React from "react";
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";
import FeatureProductCard from "@/app/components/featuredProduct/FeatureProductCard";
import Link from "next/link";

const fetcher = async (): Promise<products | sqlProduct[]> => {
  return await unAuthorizedGetRequest("products");
};

function isMongoDBResponse(data: products | sqlProduct[]): data is products {
  return (data as products).products !== undefined;
}
async function FeaturedProduct() {
  const productsData = await fetcher();
  return (
    <>
      {isMongoDBResponse(productsData)
        ? // MongoDB Products
          productsData.products.length > 0 && (
            <section className="dark:bg-gray-700 lg:px-20 md:px-6 xl:px-36 pt-5 flex flex-col gap-y-1  px-4">
              <div className="text-3xl flex flex-col gap-y-3 text-center font-serif mb-2  dark:text-white">
                <h2 className="text-3xl font-serif tracking-wider font-semibold">
                  Featured Products
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-10 gap-y-8 place-items-center">
                {productsData.products.map((product) => (
                  <FeatureProductCard item={product} key={product._id} />
                ))}
              </div>

              <div className="flex justify-center mt-4 ">
                <Link
                  href="/products"
                  className="bg-secondary px-10 py-2 rounded-lg hover:rounded-xl text-xl "
                >
                  Show All
                </Link>
              </div>
            </section>
          )
        : // MySQL Products
          productsData.length > 0 && (
            <section className="pb-2 xl:px-36 dark:bg-gray-700 flex flex-col gap-y-4 py-14 px-4 justify-center">
              <div className="text-3xl flex flex-col gap-y-3 text-center font-serif mb-2  dark:text-white">
                <h2 className="text-3xl font-serif tracking-wider font-semibold">
                  Featured Products
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-8 place-items-center">
                {productsData.map((product) => (
                  <FeatureProductCard item={product} key={product.productID} />
                ))}
              </div>

              <div className="flex justify-center mt-4 ">
                <Link
                  href="/products"
                  className="bg-secondary px-10 py-2 rounded-lg text-xl"
                >
                  Show All
                </Link>
              </div>
            </section>
          )}
    </>
  );
}

export default FeaturedProduct;
