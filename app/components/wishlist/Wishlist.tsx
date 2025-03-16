"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { authorizedGetRequest } from "@/services/apiReqServices/authorizedRequest";
import WishListCard from "./WishListCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Toast from "../toast/Toast";
import { wishlist } from "@/constants";

// Type Guard to check if wishlist is SQL-based
function isSQLWishlist(
  wishlists: wishlist[] | sqlWishList[]
): wishlists is sqlWishList[] {
  return wishlists.length > 0 && "wishListID" in wishlists[0];
}

const fetcher = async (url: string) => {
  try {
    const response = await authorizedGetRequest(url);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch wishlist: ${error}`);
  }
};

function Wishlist() {
  const {
    data: wishlists,
    error,
    mutate,
  } = useSWR<wishlist[] | sqlWishList[], Error>("wishlists", fetcher);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [toastVisible, setToastVisible] = useState(false);

  // Handle loading and error states
  if (!wishlists) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Determine the user name correctly based on type
  const userName = isSQLWishlist(wishlists)
    ? wishlists[0].name
    : wishlists[0].userID.name;

  // Handle the delete event
  const handleDelete = (wishListID: string | number) => {
    if (isSQLWishlist(wishlists)) {
      const updatedWishlists: sqlWishList[] = wishlists.filter(
        (item) => item.wishListID !== wishListID
      );
      mutate(updatedWishlists, false);
    } else {
      const updatedWishlists: wishlist[] = wishlists.filter(
        (item) => item._id !== wishListID
      );
      mutate(updatedWishlists, false);
    }
  };
  // Show toast with message and type
  const handleShowToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  return (
    <div className="flex p-0 sm:p-4 w-11/12 md:w-4/5 gap-x-10 mx-auto font-serif">
      {wishlists.length > 0 && (
        <div className="hidden md:flex shadow-lg p-4 w-1/5 h-28 justify-center items-center gap-x-4 dark:bg-gray-300 border-gray-300 border">
          <FontAwesomeIcon icon={faCircleUser} className="w-10 h-10" />
          <div className="flex flex-col text-gray-600">
            <p>Hello,</p>
            <div className="text-xl">{userName}</div>
          </div>
        </div>
      )}
      <div className="flex flex-col w-full sm:w-4/5 mx-auto">
        <div className="text-lg dark:text-white">
          {wishlist.MY_WISHLIST}({wishlists.length || 0})
        </div>
        {wishlists.length > 0 ? (
          wishlists.map((item) => (
            <WishListCard
              key={isSQLWishlist(wishlists) ? item.wishListID : item._id}
              item={item}
              onDelete={handleDelete}
              onShowToast={handleShowToast}
            />
          ))
        ) : (
          <div className="text-lg text-center">{wishlist.NO_PRODUCT}</div>
        )}
      </div>

      {/* Show Toast if it's visible */}
      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastVisible(false)}
        />
      )}
    </div>
  );
}

export default Wishlist;
