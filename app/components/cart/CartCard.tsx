import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

function CartCard({ item }: { item: cartItem }) {
  const { removeItemFromCart, updateCartItemQuantity } = useCartStore();
  return (
    <div className="border  border-gray-400 flex justify-between items-center sm:px-10 py-5  dark:bg-gray-300 sm:text-base text-sm">
      <div className="flex  justify-center items-center gap-3 ">
        <Image
          width={360}
          height={360}
          alt={item.productName}
          src={item.productThumbnail}
          className="md:w-36 w-28 shadow-md p-2"
        />
        <div>
          <div>{item.productName}</div>
          <div>₹{item.productPrice}</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex items-center gap-2 ">
          {item.quantity !== 1 && (
            <button
              className="px-2 py-1 bg-gray-300 dark:bg-white rounded"
              onClick={() => {
                updateCartItemQuantity(item.cartItemID, item.quantity - 1);
              }}
            >
              -
            </button>
          )}
          <p className="text-lg">{item.quantity}</p>
          <button
            className="px-2 py-1  dark:bg-white bg-gray-300 rounded"
            onClick={() => {
              updateCartItemQuantity(item.cartItemID, item.quantity + 1);
            }}
          >
            +
          </button>
        </div>
        <div>
          <button
            className="mt-2 px-2 py-2 text-sm sm:text-base sm:px-6 sm:py-2 bg-red-500 hover:bg-red-400  text-white rounded"
            onClick={() => {
              removeItemFromCart(item.cartItemID);
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
