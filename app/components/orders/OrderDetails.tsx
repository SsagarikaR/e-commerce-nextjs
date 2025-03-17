"use client";
import { fetcher } from "@/lib/helpers/authorizedGetFetcher";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

function OrderDetails({ id }: { id: string }) {
  const { data: order, error } = useSWR<orderData[] | sqlOrderData[], Error>(
    `orders`,
    fetcher
  );

  // Type guards
  function isSqlDBOrder(
    order: orderData | sqlOrderData
  ): order is sqlOrderData {
    return "orderID" in order;
  }

  // Type guards
  function isSqlDBOrderItem(
    orderItem: OrderItem | sqlOrderItem
  ): orderItem is sqlOrderItem {
    return "orderId" in orderItem;
  }

  const currentOrder = order?.filter((order) =>
    isSqlDBOrder(order) ? order.orderID : order._id === id
  );
  console.log(order, "order");
  console.log(currentOrder);
  if (!currentOrder) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex pt-36 w-screen font-serif  overflow-auto dark:bg-gray-700">
      <div className="w-4/5  flex md:flex-row flex-col gap-y-5 mx-auto lg:gap-x-10">
        <div className="flex flex-col  lg:w-3/5 shadow-lg pt-20 px-3  lg:px-8 xl:px-20 gap-2  pb-10 dark:bg-gray-300 border border-gray-400">
          <div className="text-lg flex gap-2 font-semibold ">
            <div>Status: </div>
            <div
              className={`${
                currentOrder[0].status === "cancel"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {" "}
              {currentOrder[0].status}
            </div>
          </div>
          {currentOrder &&
            currentOrder[0].items.map((item) => (
              <div
                key={
                  isSqlDBOrderItem(item) ? item.productId : item.productID._id
                }
                className="shadow-md lg:p-2 p-1 w-full border border-gray-400"
              >
                <div className="flex justify-between  lg:p-3 p-1 w-full">
                  <div className="flex flex-col text-lg lg:text-xl gap-y-3 font-semibold ">
                    <div className="">
                      <div>
                        {isSqlDBOrderItem(item)
                          ? item.productName
                          : item.productID.productName}
                      </div>
                    </div>
                    <div>
                      ₹
                      {isSqlDBOrderItem(item)
                        ? item.productPrice
                        : item.productID.productPrice}
                    </div>
                    <div>Quantity: {item.quantity}</div>
                  </div>
                  <Image
                    width={440}
                    height={440}
                    alt={
                      isSqlDBOrderItem(item)
                        ? item.productName
                        : item.productID.productName
                    }
                    src={
                      isSqlDBOrderItem(item)
                        ? item.productThumbnail
                        : item.productID.productThumbnail
                    }
                    className="lg:w-44 lg:h-44 w-32 h-32 shadow-md p-2 bg-white"
                  />
                </div>
                <div className="flex justify-between">
                  <Link
                    href={`/review?pid=${isSqlDBOrderItem(item) ? item.productId : item.productID._id}`}
                    className="bg-primary p-4 py-2 rounded-lg hover:bg-secondary"
                  >
                    Add Review
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-4 md:w-2/5  w-3/5 lg:w-2/5 xl:w-1/5 mx-auto ">
          <div className="flex flex-col shadow-lg p-4 border border-gray-400 gap-1 dark:bg-gray-300">
            <p className="font-semibold text-sm  border-b border-gray-400 py-2">
              Shipping Details
            </p>
            <div className="font-semibold">
              {isSqlDBOrder(currentOrder[0])
                ? currentOrder[0].name
                : currentOrder[0].user.name}
            </div>
            <div>
              {isSqlDBOrder(currentOrder[0])
                ? `${currentOrder[0].state}, ${currentOrder[0].city}, ${currentOrder[0].pincode}, ${currentOrder[0].locality}, ${currentOrder[0].address}`
                : `${currentOrder[0].address.state}, ${currentOrder[0].address.city}, ${currentOrder[0].address.pincode}, ${currentOrder[0].address.locality}, ${currentOrder[0].address.address}`}
            </div>
            <div>
              <p className="font-semibold">Phone number:</p>
              <p>
                {isSqlDBOrder(currentOrder[0])
                  ? currentOrder[0].contactNo
                  : currentOrder[0].user.contactNo}
              </p>
            </div>
          </div>
          <div className="flex flex-col shadow-lg border border-gray-400 p-4 gap-2 dark:bg-gray-300">
            <p className="font-semibold text-sm border-b  border-gray-400 py-2">
              Price Details
            </p>
            <div className="flex justify-between">
              <p>Selling price</p>
              <p>₹{currentOrder[0].totalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p>Handling price</p>
              <p>₹{currentOrder[0].handlingPrice}</p>
            </div>
            <div className="flex justify-between">
              <p>Platform fee</p>
              <p>₹{currentOrder[0].platformFee}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Charge</p>
              <p>₹{currentOrder[0].deliveryCharge}</p>
            </div>
            <div className="flex justify-between font-semibold border-t border-gray-400 pt-2">
              <p>Total Amount</p>
              <p>₹{currentOrder[0].totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
