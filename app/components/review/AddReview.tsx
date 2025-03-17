import React from "react";
import { review } from "@/constants";
import Image from "next/image";
import AddReviewForm from "./AddReviewForm";
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";

const AddReview = async ({ pid }: { pid: string }) => {
  const product = await unAuthorizedGetRequest(`/products?id=${pid}`);
  console.log(product);
  return (
    <>
      <div className="w-full pt-16 flex flex-col justify-center items-center font-serif gap-2">
        <div className="w-11/12 flex items-center justify-between border border-gray-400  px-10 py-4  font-semibold dark:bg-gray-300">
          <div className="text-2xl">{review.RATING_REVIEWS}</div>
          <div className="flex items-center justify-center gap-x-3">
            <div className="text-lg">{product.products[0].productName}</div>
            <Image
              width={240}
              height={240}
              alt={product.products[0].productName}
              src={product.products[0].productThumbnail}
              className="w-24 shadow-md p-2"
            />
          </div>
        </div>
        <AddReviewForm pid={pid} />
      </div>
    </>
  );
};

export default AddReview;
