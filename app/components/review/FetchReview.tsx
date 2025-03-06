"use client"; // Indicating this is a client-side component
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr"; // Import SWR
import { authorizedGetRequest } from "@/services/apiReqServices/authorizedRequest"; // Import your axios function
import { review } from "@/constants";

// Fetch review data using SWR and axios
const fetcher = async (url: string) => {
  try {
    const response = await authorizedGetRequest(url); // Use your custom axios request
    return response;
  } catch (error) {
    throw new Error("Failed to fetch reviews");
  }
};

function FetchReview({ id, rating }: { id: number; rating: number }) {
  // Use SWR to fetch review data
  const { data: reviews, error } = useSWR<review[], Error>(
    `/reviews?pid=${id}`,
    fetcher
  );

  // Handle loading state
  if (!reviews) {
    return <div>Loading reviews...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="full border-t pt-2 flex flex-col">
      <div className="flex flex-col w-full">
        <div className="flex w-full items-center justify-between">
          <div className="text-xl font-semibold">{review.RATING_REVIEWS}</div>
          <div
            className={`bg-green-500 flex items-center justify-center p-1 gap-x-2 rounded-3xl`}
          >
            <div className="text-white text-lg">{rating}</div>
            <div className="text-white">
              <FontAwesomeIcon icon={faStar} className="w-5 h-5" />
            </div>
          </div>
          <Link
            href={`/review?pid=${id}`}
            className="bg-purple-300 text-lg px-3 py-1 rounded-md hover:bg-purple-400"
          >
            {review.ADD_REVIEW}
          </Link>
        </div>
        <div>
          <div className="flex flex-col mt-4">
            {reviews && reviews.length > 0 ? (
              reviews.map((review: review) => (
                <div className="flex flex-col" key={review.reviewID}>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div>
                        <FontAwesomeIcon
                          icon={faCircleUser}
                          className="w-6 h-6"
                        />
                      </div>
                      <div className="text-2xl">{review.name}</div>
                    </div>
                    <div
                      className={`bg-green-500 flex p-1 gap-x-2 rounded-3xl items-center`}
                    >
                      <div className="text-white text-md">{review.rating}</div>
                      <div className="text-white">
                        <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 mb-4">{review.description}</div>
                </div>
              ))
            ) : (
              <div>{review.NO_REVIEW}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FetchReview;
