"use client";
import {
  faCheckCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from "../confirmModal.tsx/ConfirmModal";
import { useState } from "react";
import React from "react";
import Toast from "../toast/Toast";
import { authorizedPatchRequest } from "@/services/apiReqServices/authorizedRequest";
import { mutate } from "swr";
import Link from "next/link";
import { orders } from "@/constants";

function OrderCard({ item }: { item: OrderData }) {
  const [showModal, setShowModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState<string | undefined>();

  const confirmDelete = async () => {
    try {
      const response = await authorizedPatchRequest("orders/status", {
        orderId: item.orderID,
      });
      mutate("orders");
      setToastMessage("Order canceled successfully");
      setToastType("success");
      setToastVisible(true);
      console.log(response);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await authorizedPatchRequest("orders", {
        orderId: item.orderID,
        newAddress: address,
      });
      console.log(response);
      setToastMessage("Address updated successfully");
      setToastType("success");
      setToastVisible(true);
      mutate("orders");
      setIsEdit(false);
    } catch (error) {
      setToastMessage(
        `Error in updating product address, please try again!${error}`
      );
      setToastType("error");
      setToastVisible(true);
      setIsEdit(false);
    }
  };
  return (
    <>
      <div
        key={item.orderID}
        className={` p-6 rounded-xl w-4/5 mx-auto shadow-lg m-y-2 bg-white  ${
          item.status === "Cancelled" ? "bg-gray-300" : "bg-white"
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
            <Link href={`/orders/${item.orderID}`}>
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
                          {orders.QUNATITY}: ₹{item.productPrice}
                        </p>
                        <p className="text-sm text-gray-600">
                          {orders.QUNATITY}: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">{orders.NO_ITEMS}</p>
                )}
                {toastVisible && (
                  <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setToastVisible(false)}
                  />
                )}
              </div>
            </Link>
          </div>

          {/* Address Section */}
          <div className="mt-6 flex gap-x-4 items-center justify-between">
            <div className="flex gap-3 items-center">
              {!isEdit ? (
                <>
                  <p className="text-md text-gray-600">
                    {orders.ADDRESS}: {item.address}
                  </p>

                  {item.status !== "Cancelled" && (
                    <div
                      onClick={() => {
                        setIsEdit(true);
                        setAddress(item.address);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="cursor-pointer"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    className="border-gray-300 border outline-none"
                  ></textarea>
                  <div className="text-green-400" onClick={handleEdit}>
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
            {item.status !== "Cancelled" && (
              <div
                className="flex justify-center items-center gap-x-1 text-red-500 cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                <div>{orders.CANCEL_ORDER}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={showModal}
        title="Are you sure you Cancel this order?"
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)} // Close modal without deleting
      />
    </>
  );
}

export default OrderCard;
