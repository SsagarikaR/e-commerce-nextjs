"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest";
import Toast from "../toast/Toast";
import { modal_btn, order, price_detail } from "@/constants";
import { useRouter } from "next/navigation";
import Image from "next/image";

function MakeOrderPage({ id }: { id: string | null }) {
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const { cartItems } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setTotalPrice(cartItems[0].totalPrice);
      setTotalAmount(cartItems[0].totalAmount);
    } else {
      setTotalPrice(0);
    }
  }, []);

  const handleConfirm = async () => {
    if (!address || address === "") {
      setToastMessage("Please enter you address");
      setToastType("error");
      setToastVisible(true);
    } else {
      setConfirmationVisible(true);
    }
  };

  const handleSubmitOrder = async () => {
    let items = [];
    // Multiple products from cart
    items = cartItems.map((item) => ({
      productId: item.productID,
      quantity: item.quantity,
      price: item.productPrice,
    }));
    const response = await authorizedPostRequest("orders", {
      totalAmount,
      items,
      address,
      totalPrice,
    });
    if (response.status === 200) {
      setToastMessage(response.message);
      setToastType("success");
      setToastVisible(true);
      router.push("/orders");
    } else {
      setToastMessage(response.message);
      setToastType("error");
      setToastVisible(true);
    }
  };

  return (
    <div className="min-w-screen pt-24 min-h-screen flex justify-center items-center  dark:bg-gray-600 shadow-lg">
      <div
        className={` container p-6 max-w-4xl bg-white ${isConfirmationVisible && "opacity-25"} dark:bg-gray-200`}
      >
        <h2 className="text-2xl font-semibold dark:text-black mb-6">
          {id ? "Order Product" : "Order from Cart"}
        </h2>

        {/* Display single product or cart items */}
        <div className="mb-6 flex justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4">Items in your Cart:</h3>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <Image
                    width={240}
                    height={240}
                    src={item.productThumbnail}
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <p className="text-lg font-semibold">{item.productName}</p>
                    <p className="text-gray-700">Price: ₹{item.productPrice}</p>
                    <p className="text-gray-700">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="w-2/5 border p-4 flex flex-col gap-3 h-72 md:text-base text-sm">
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
              <p>{price_detail.HANDLING_PRICE}</p>
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

        {/* Address Input */}
        <div className="mb-6">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-2 dark:text-black"
          >
            Enter Shipping Address:
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none dark:text-black focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your address"
          ></textarea>
        </div>

        <div className="flex justify-center mb-6">
          <button
            className="px-6 py-3 bg-blue-400 cursor-pointer text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none"
            onClick={handleConfirm}
          >
            Confirm Order
          </button>
        </div>
      </div>

      {/* Confirmation Popup */}
      {isConfirmationVisible && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white dark:bg-gray-200 p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3">
            <h3 className="text-2xl font-semibold text-center mb-4 dark:text-black">
              {order.ORDER_MODAL_TITLE}
            </h3>
            <p className="text-lg text-center mb-4 dark:text-black">
              {order.ORDER_MODAL_DESC}
            </p>
            <p className="text-lg text-center font-medium dark:text-black">
              {address}
            </p>
            <div className="flex justify-center gap-15 mt-6 gap-2">
              <button
                className="px-6 py-3 bg-red-400 cursor-pointer text-white font-semibold rounded-lg hover:bg-red-400 focus:outline-none"
                onClick={() => setConfirmationVisible(false)}
              >
                {modal_btn.CANCEL}
              </button>
              <button
                className="px-6 py-3 bg-purple-400 cursor-pointer text-white font-semibold rounded-lg hover:bg-purple-400 focus:outline-none"
                onClick={handleSubmitOrder}
              >
                {modal_btn.CONFIRM}
              </button>
            </div>
          </div>
        </div>
      )}
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

export default MakeOrderPage;
