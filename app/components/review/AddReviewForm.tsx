"use client";
import React, { useState } from "react";
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest";
import Toast from "../toast/Toast";
import { useRouter } from "next/navigation";

import { review } from "@/constants";

function AddReviewForm({ pid }: { pid: string }) {
  const [rating, setRating] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const router = useRouter();
  const reviewData = {
    productID: pid,
    rating,
    description,
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // POST the review
      const response = await authorizedPostRequest("reviews", reviewData);

      // Show success toast and navigate to product detail page
      console.log(response);
      if (response.status === 201) {
        setToastMessage("Review submitted successfully!");
        setToastType("success");
        setToastVisible(true);
        router.push(`/products/${pid}`); // Navigate to the product page
      } else {
        setToastMessage(response.message);
        setToastType("error");
        setToastVisible(true);
      }
    } catch (error) {
      setToastMessage(`An error occurred while submitting the review.${error}`);
      setToastType("error");
      setToastVisible(true);
    }
  };

  return (
    <>
      <form className="w-11/12 gap-4 flex flex-col " onSubmit={handleSubmit}>
        <div className="flex flex-col border border-gray-400 p-4 gap-y-2  dark:bg-gray-300">
          <div className="text-lg font-semibold">{review.RATE_PRODUCT}</div>
          <input
            type="number"
            value={rating}
            onChange={(e) => {
              // Get the value from the input
              let value = Number(e.target.value);

              // If the value is greater than 5, set it to 5
              if (value > 5) {
                value = 5;
              }

              // Update the state with the new value
              setRating(value);
            }}
            className="border outline-none w-44 p-3"
          />
        </div>

        <div className="border border-gray-400   dark:bg-gray-300">
          <div className="p-4 text-lg font-semibold">
            {review.REVIEW_PRODUCT}
          </div>
          <div className="border">
            <div className="pl-4">{review.DESCRIPTION}</div>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary hover:bg-secondary border-gray-400 border px-4 py-2 rounded-md"
          >
            {review.SUBMIT}
          </button>
        </div>
      </form>
      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastVisible(false)}
        />
      )}
    </>
  );
}

export default AddReviewForm;
