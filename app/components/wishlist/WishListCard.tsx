import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { authorizedDeleteRequest } from "@/services/apiReqServices/authorizedRequest";
import Image from "next/image";

interface WishListCardProps {
  item: wishlist | sqlWishList;
  onDelete: (wishListID: string | number) => void;
  onShowToast: (message: string, type: "success" | "error") => void;
}

function WishListCard({ item, onDelete, onShowToast }: WishListCardProps) {
  const handleDelete = async () => {
    try {
      const response = await authorizedDeleteRequest("wishlists", {
        wishListID: isSQLWishlist(item) ? item.wishListID : item._id!,
      });

      if (response.status === 200) {
        onDelete(isSQLWishlist(item) ? item.wishListID : item._id!);
        onShowToast(response.message, "success");
      } else {
        onShowToast(response.message, "error");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      onShowToast("An error occurred while deleting the item", "error");
    }
  };

  // Type Guard to check if item is sqlWishList
  const isSQLWishlist = (
    wishlistItem: wishlist | sqlWishList
  ): wishlistItem is sqlWishList => {
    return "productName" in wishlistItem;
  };

  const productName = isSQLWishlist(item)
    ? item.productName
    : item.productID.productName;
  const productThumbnail = isSQLWishlist(item)
    ? item.productThumbnail
    : item.productID.productThumbnail;
  const brandThumbnail = isSQLWishlist(item)
    ? item.brandThumbnail
    : item.productID.brandID.brandThumbnail;
  const brandName = isSQLWishlist(item)
    ? item.brandName
    : item.productID.brandID.brandName;
  const productPrice = isSQLWishlist(item)
    ? item.productPrice
    : item.productID.productPrice;

  return (
    <div className="flex shadow-lg items-center justify-between font-serif text-sm md:text-md lg:text-lg font-semibold  p-4 dark:bg-gray-300 border-gray-400 border">
      <div className="flex justify-center items-center gap-x-2">
        <Image
          width={280}
          height={280}
          src={productThumbnail}
          className="w-28 shadow-md p-2 cursor-pointer bg-white"
          alt={productName}
        />
        <div className="flex flex-col">
          <div className="flex justify-center items-center gap-1">
            <div>{productName}</div>
            <Image
              width={80}
              height={80}
              src={brandThumbnail}
              className="w-8 h-8 border shadow-md rounded-full"
              alt={brandName}
            />
          </div>
          <div>₹{productPrice}</div>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <FontAwesomeIcon
          icon={faTrash}
          className="w-6 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default WishListCard;
