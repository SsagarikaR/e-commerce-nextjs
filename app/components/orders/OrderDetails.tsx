"use client";
import { fetcher } from "@/lib/helpers/authorizedGetFetcher";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

function OrderDetails({ id }: { id: string }) {
  const { data: order, error } = useSWR<OrderData[], Error>(`orders`, fetcher);
  const currentOrder = order?.filter((order) => order.orderID === Number(id));
  console.log(currentOrder);
  console.log(currentOrder);
  if (!currentOrder) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex pt-36 w-screen font-serif  overflow-auto dark:bg-gray-700">
      <div className="w-4/5  flex md:flex-row flex-col gap-y-5 mx-auto gap-x-10 ">
        <div className="flex flex-col  lg:w-3/5 shadow-lg pt-20 px-3 lg:px-20 gap-2  pb-10 dark:bg-gray-300 border border-gray-300">
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
                key={item.productId}
                className="shadow-md lg:p-2 p-1 w-full border border-gray-300"
              >
                <div className="flex justify-between  lg:p-3 p-1 w-full">
                  <div className="flex flex-col text-lg lg:text-xl gap-y-3 font-semibold text-gray-700">
                    <div className="">
                      <div>{item.productName}</div>
                    </div>
                    <div>₹{item.productPrice}</div>
                    <div>Quantity: {item.quantity}</div>
                  </div>
                  <Image
                    width={440}
                    height={440}
                    alt={item.productName}
                    src={item.productThumbnail}
                    className="lg:w-44 lg:h-44 w-32 h-32 shadow-md p-2"
                  />
                </div>
                <div className="flex justify-between">
                  <Link
                    href={`/review?pid=${item.productId}`}
                    className="bg-blue-300 p-4 py-2 rounded-lg hover:bg-blue-400"
                  >
                    Add Review
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-4 md:w-2/5  w-3/5 lg:w-1/5 mx-auto ">
          <div className="flex flex-col shadow-lg p-4 border border-gray-400 gap-1 dark:bg-gray-300">
            <p className="font-semibold text-sm text-gray-600 border-b py-2">
              Shipping Details
            </p>
            <div className="font-semibold">{currentOrder[0].name}</div>
            <div>
              {currentOrder[0].address.state} , {currentOrder[0].address.city},{" "}
              {currentOrder[0].address.pincode},{" "}
              {currentOrder[0].address.locality},{" "}
              {currentOrder[0].address.address}
            </div>
            <div>
              <p className="font-semibold">Phone number:</p>
              <p>{currentOrder[0].contactNo}</p>
            </div>
          </div>
          <div className="flex flex-col shadow-lg border border-gray-400 p-4 gap-2 dark:bg-gray-300">
            <p className="font-semibold text-sm text-gray-600 border-b py-2">
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
            <div className="flex justify-between font-semibold border-t pt-2">
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
