import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { review } from "@/constants";
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";

export const fetchReviews = async (id: string) => {
  const data = await unAuthorizedGetRequest(`/reviews?pid=${id}`);
  return data;
};

async function FetchReview({ id, rating }: { id: number; rating: number }) {
  const reviews = await fetchReviews(String(id));

  // Handle loading state
  if (!reviews) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="full border-t pt-2 flex flex-col font-serif">
      <div className="flex flex-col w-full">
        <div className="flex w-full items-center justify-between">
          <div className="text-xl font-semibold">{review.RATING_REVIEWS}</div>
          <div
            className={`bg-green-500 flex items-center justify-center p-1 lg:gap-x-2 rounded-3xl`}
          >
            <div className="text-white text-lg">{rating}</div>
            <div className="text-white">
              <FontAwesomeIcon icon={faStar} className="lg:w-5 lg:h-5" />
            </div>
          </div>
          <Link
            href={`/review?pid=${id}`}
            className="bg-orange-400 border text-black xl:text-lg lg:px-3 py-1 px-2 text-md rounded-md hover:bg-orange-500"
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
