"use client";
// pages/AddReview.tsx
import React, { useState } from "react";
import useSWR, { mutate } from "swr"; // Import SWR
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { authorizedGetRequest } from "@/services/reqServices/authorizedRequest";
import { authorizedPostRequest } from "@/services/reqServices/authorizedRequest";
import Toast from "../toast/Toast"; // Import Toast component

// Fetch product data using SWR
const fetcher = async (url: string) => {
  try {
    const response = await authorizedGetRequest(url);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
};

const AddReview = ({ pid }: { pid: string }) => {
  const router = useRouter();
  const { data: product, error } = useSWR<products[], Error>(
    `/products?id=${pid}`,
    fetcher
  );

  // Form state and toast state
  const [rating, setRating] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [toastVisible, setToastVisible] = useState(false); // State for showing/hiding the toast
  const [toastMessage, setToastMessage] = useState(""); // The toast message
  const [toastType, setToastType] = useState<"success" | "error">("success"); // Type of toast (success or error)

  // Handle loading and error states
  if (!product) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   

    const reviewData = {
      productID: pid,
      rating,
      description,
    };

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
      setToastMessage("An error occurred while submitting the review.");
      setToastType("error");
      setToastVisible(true);
    }
  };

  return (
    <>
      <div className="w-full pt-16 flex flex-col justify-center items-center font-serif gap-2">
        <div className="w-11/12 flex items-center justify-between border px-10 py-4 text-gray-700 font-semibold">
          <div className="text-2xl">Rating & Reviews</div>
          <div className="flex items-center justify-center gap-x-3">
            <div className="text-lg">{product[0].productName}</div>
            <img
              src={product[0].productThumbnail}
              className="w-24 shadow-md p-2"
            />
          </div>
        </div>

        <form className="w-11/12 gap-4 flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col border p-4 gap-y-2 text-gray-600">
            <div className="text-lg font-semibold">Rate this product</div>
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
              min={0}
              max={1}
              className="border outline-none w-44 p-3"
            />
          </div>

          <div className="border text-gray-600">
            <div className="p-4 text-lg font-semibold">Review this product</div>
            <div className="border">
              <div className="pl-4">Description</div>
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
              className="bg-purple-300 px-4 py-2 rounded-md"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>

      {/* Display Toast */}
      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
           onClose={() => setToastVisible(false)}
        />
      )}
    </>
  );
};

export default AddReview;
