import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { it } from "node:test";
import React from "react";

function OrderCard({ item }: { item: OrderData }) {
  return (
    <Link href={`/orders/${item.orderID}`}>
      <div
        key={item.orderID}
        className={` p-6 rounded-xl w-4/5 mx-auto shadow-lg m-y-2 bg-white ${
          item.status === "Cancelled" ? "opacity-80" : "opacity-100"
        } `}
      >
        <div className={`relative`}>
          <p className="text-lg text-gray-600 mt-2">
            Status:{" "}
            <span
              className={`font-semibold ${
                item.status === "Cancelled" ? "text-red-500" : "text-green-500"
              }`}
            >
              {item.status}
            </span>
          </p>
          <div className="mt-6 space-y-4">
            <h4 className="text-xl font-semibold text-gray-800">Items</h4>
            <div className="grid grid-cols-1  gap-6 ">
              {item.items && item.items.length > 0 ? (
                item.items.map((item) => (
                  <div
                    key={item.productId}
                    className=" p-4 rounded-lg shadow-lg flex items-center"
                  >
                    <img
                      src={item.productThumbnail}
                      alt={item.productName}
                      className="w-24 h-24 object-cover rounded-lg shadow-lg"
                    />
                    <div className="ml-4">
                      <p className="text-lg font-semibold text-gray-800">
                        {item.productName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ₹{item.productPrice}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No items in this order</p>
              )}
            </div>
          </div>
          {/* Address Section */}
          <div className="mt-6 flex gap-x-4 items-center">
                    <p className="text-md text-gray-600">Address: {item.address}</p>
                    {item.status !== 'Cancelled' && (
                    <FontAwesomeIcon icon={faEdit}/>
                  )}
                  </div>

        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
