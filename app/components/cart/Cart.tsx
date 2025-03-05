"use client";
import React from "react";
import CartCard from "./CartCard";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useEffect } from "react";
import { price_detail } from "@/constants";

function Cart() {
  const { cartItems, fetchCartItems } = useCartStore();
  console.log(cartItems, "cart items");

  useEffect(() => {
    fetchCartItems(); // Ensure cart items are fetched when token is available
  }, []);

  return (
    <div className="w-screen pt-24 ">
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full sm:p-0 p-1 sm:w-11/12 xl:w-4/5 flex m-auto gap-x-6">
          <div className="flex flex-col max-h-[800px] w-4/5 border">
            <div className="flex flex-col max-h-[900px] overflow-auto">
              {cartItems.map((item) => (
                <CartCard key={item.cartItemID} item={item} />
              ))}
            </div>
            <div className="flex justify-end p-2 px-10 border dark:border-white dark:bg-gray-300">
              <Link
                href="/checkout"
                className="bg-purple-300 hover:bg-purple-400 p-6 py-3 rounded-md"
              >
                Place Order
              </Link>
            </div>
          </div>
          <div className=" sm:text-base text-sm lg:w-1/5 border p-4 flex dark:border-white flex-col gap-3 h-64  dark:bg-gray-300 ">
            <div className="flex justify-between">
              <p>
                {price_detail.TOTAL_PRICE}({cartItems.length} item)
              </p>
              <p>₹{cartItems[0].totalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p>{price_detail.HANDLING_PRICE}</p>
              <p>₹{cartItems[0].handlingPrice}</p>
            </div>
            <div className="flex justify-between">
              <p>{price_detail.PLATFORM_FEE}</p>
              <p>₹{cartItems[0].platformFee}</p>
            </div>
            <div className="flex justify-between">
              <p>{price_detail.DELIVERY_CHARGE}</p>
              <p>₹{cartItems[0].deliveryCharge}</p>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <p>{price_detail.TOTAL_AMOUNT}</p>
              <p>₹{cartItems[0].totalAmount}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-2xl text-center font-semibold dark:text-white">
          No items found
        </div>
      )}
    </div>
  );
}

export default Cart;
