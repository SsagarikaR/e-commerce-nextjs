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

export const fetchWishList = async (productId: string) => {
  const response = await authorizedGetRequest(`wishlists/${productId}`);
  return response;
};

export const addWishList = async (productId: string) => {
  await authorizedPostRequest(`wishlists`, { productId });
};

export const deleteWishList = async (wishListId: string) => {
  const response = await authorizedDeleteRequest(`wishlists`, { wishListId });
  return response;
};

function WishlistIcon({ productId }: { productId: string }) {
  const [wishlistStatus, setWishlistStatus] = useState<boolean | null>(null);
  const [wishlistId, setWishlistId] = useState<string | undefined>(); // Use state to store the wishlist data

  useEffect(() => {
    console.log(productId, "product id");
    const loadWishList = async () => {
      try {
        const response = await fetchWishList(productId);
        if (response.message) {
          setWishlistStatus(false);
        } else {
          setWishlistId(response._id); // Store the wishlist in state
          // console.log(response, wishList, "response");
          setWishlistStatus(true);
        }
      } catch (error) {
        console.log("Error fetching wishlist:", error);
      }
    };
    loadWishList();
  }, [productId]);

  const handleClick = async () => {
    try {
      if (wishlistStatus === null) return; // Prevent any action if the wishlistStatus is still loading
      // console.log(wishList, "wishlist");
      // console.log(wishlistStatus, "status");
      if (!wishlistStatus) {
        // Add to wishlist
        await addWishList(productId);
        setWishlistStatus(true);
        const response = await fetchWishList(productId);
        setWishlistId(response);
      } else {
        // Delete from wishlist
        if (wishlistId) {
          await deleteWishList(wishlistId);
          setWishlistStatus(false);
          setWishlistId(undefined); // Clear the wishlist after deletion
          const response = await fetchWishList(productId);
          setWishlistId(response._id);
        }
      }
    } catch (error) {
      console.log("Error adding/removing from wishlist:", error);
    }
  };

  return (
    <div className="absolute m-2 cursor-pointer" onClick={handleClick}>
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
