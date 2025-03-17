import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

function CartCard({ item }: { item: cartItem | sqlCartItem }) {
  const { removeItemFromCart, updateCartItemQuantity } = useCartStore();
  const isSQLCartItem = (
    cartItem: cartItem | sqlCartItem
  ): cartItem is sqlCartItem => {
    return "productName" in cartItem;
  };

  return (
    <div className="border  border-gray-400 flex justify-between items-center sm:px-10 py-5  dark:bg-gray-300 sm:text-base text-sm">
      <div className="flex  justify-center items-center gap-3 ">
        <Image
          width={360}
          height={360}
          alt={
            isSQLCartItem(item)
              ? item.productName
              : item.productDetails.productName
          }
          src={
            isSQLCartItem(item)
              ? item.productThumbnail
              : item.productDetails.productThumbnail
          }
          className="md:w-36 w-28 shadow-md p-2 bg-white"
        />
        <div>
          <div>
            {isSQLCartItem(item)
              ? item.productName
              : item.productDetails.productName}
          </div>
          <div>
            ₹
            {isSQLCartItem(item)
              ? item.productPrice
              : item.productDetails.productPrice}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex items-center gap-2 ">
          {item.quantity !== 1 && (
            <button
              className="px-2 py-1 bg-white rounded"
              onClick={() => {
                updateCartItemQuantity(
                  isSQLCartItem(item) ? item.cartItemID : item._id,
                  item.quantity - 1
                );
              }}
            >
              -
            </button>
          )}
          <p className="text-lg">{item.quantity}</p>
          <button
            className="px-2 py-1  bg-white  rounded"
            onClick={() => {
              updateCartItemQuantity(
                isSQLCartItem(item) ? item.cartItemID : item._id,
                item.quantity + 1
              );
            }}
          >
            +
          </button>
        </div>
        <div>
          <button
            className="mt-2 px-2 py-2 text-sm sm:text-base sm:px-6 sm:py-2 bg-red-500 hover:bg-red-400  text-white rounded"
            onClick={() => {
              removeItemFromCart(
                isSQLCartItem(item) ? item.cartItemID : item._id
              );
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
