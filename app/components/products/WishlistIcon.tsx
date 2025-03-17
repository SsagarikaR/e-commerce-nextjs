"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as notWishList } from "@fortawesome/free-regular-svg-icons";
import { faHeart as wishList } from "@fortawesome/free-solid-svg-icons";
import {
  authorizedDeleteRequest,
  authorizedGetRequest,
  authorizedPostRequest,
} from "@/services/apiReqServices/authorizedRequest";

export const fetchWishList = async (productID: string | number) => {
  const response = await authorizedGetRequest(`wishlists/${productID}`);
  return response;
};

export const addWishList = async (productID: string | number) => {
  console.log(productID, "product id adding");
  await authorizedPostRequest(`wishlists`, { productID });
};

export const deleteWishList = async (wishListID: string | number) => {
  const response = await authorizedDeleteRequest(`wishlists`, { wishListID });
  return response;
};

function WishlistIcon({ productID }: { productID: string | number }) {
  const [wishlistStatus, setWishlistStatus] = useState<boolean | null>(null);
  const [wishlistId, setWishlistId] = useState<string | undefined>(); // Use state to store the wishlist data

  useEffect(() => {
    console.log(productID, "product id");
    const loadWishList = async () => {
      try {
        const response = await fetchWishList(productID);

        if (response.message) {
          setWishlistStatus(false);
        } else {
          // Store the wishlist in state
          // console.log(response, wishList, "response");
          if (response._id) {
            setWishlistId(response._id);
            setWishlistStatus(true);
            return;
          }
          if (response.length > 0) {
            setWishlistId(response[0].wishListID);
            setWishlistStatus(true);
            return;
          }
          setWishlistStatus(false);
          return;
        }
      } catch (error) {
        console.log("Error fetching wishlist:", error);
      }
    };
    loadWishList();
  }, [productID]);

  const handleClick = async () => {
    try {
      if (wishlistStatus === null) return; // Prevent any action if the wishlistStatus is still loading
      // console.log(wishList, "wishlist");
      // console.log(wishlistStatus, "status");
      if (!wishlistStatus) {
        // Add to wishlist
        await addWishList(productID);
        setWishlistStatus(true);
        const response = await fetchWishList(productID);
        setWishlistId(response);
      } else {
        // Delete from wishlist
        if (wishlistId) {
          await deleteWishList(wishlistId);
          setWishlistStatus(false);
          setWishlistId(undefined); // Clear the wishlist after deletion
          const response = await fetchWishList(productID);
          setWishlistId(response._id);
        }
      }
    } catch (error) {
      console.log("Error adding/removing from wishlist:", error);
    }
  };

  return (
    <div className="absolute m-2  cursor-pointer" onClick={handleClick}>
      {wishlistStatus === null ? (
        <FontAwesomeIcon icon={notWishList} className="w-8 h-8" />
      ) : wishlistStatus ? (
        <FontAwesomeIcon icon={wishList} className="w-8 h-8" />
      ) : (
        <FontAwesomeIcon icon={notWishList} className="w-8 h-8" />
      )}
    </div>
  );
}

export default WishlistIcon;
