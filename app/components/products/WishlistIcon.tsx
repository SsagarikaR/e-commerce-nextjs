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

export const fetchWishList = async (productID: number) => {
  const response = await authorizedGetRequest(`wishlists/${productID}`);
  return response;
};

export const addWishList = async (productID: number) => {
  await authorizedPostRequest(`wishlists`, { productID });
};

export const deleteWishList = async (wishListID: number) => {
  const response = await authorizedDeleteRequest(`wishlists`, { wishListID });
  return response;
};

function WishlistIcon({ productID }: { productID: number }) {
  const [wishlistStatus, setWishlistStatus] = useState<boolean | null>(null);
  const [wishlist, setWishlist] = useState<wishlist[]>([]); // Use state to store the wishlist data

  useEffect(() => {
    const loadWishList = async () => {
      try {
        const response = await fetchWishList(productID);
        if (response.message) {
          setWishlistStatus(false);
        } else {
          setWishlist(response); // Store the wishlist in state
          setWishlistStatus(true);
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

      if (!wishlistStatus) {
        // Add to wishlist
        await addWishList(productID);
        setWishlistStatus(true);
        const response = await fetchWishList(productID);
        setWishlist(response);
      } else {
        // Delete from wishlist
        if (wishlist.length > 0) {
          const wishListID = wishlist[0].wishListID; // Access the first element of the wishlist array
          await deleteWishList(wishListID);
          setWishlistStatus(false);
          setWishlist([]); // Clear the wishlist after deletion
          const response = await fetchWishList(productID);
          setWishlist(response);
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
