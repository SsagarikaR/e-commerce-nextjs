"use client";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from "../confirmModal.tsx/ConfirmModal";
import { useState } from "react";
import React from "react";
import Toast from "../toast/Toast";
import { authorizedPatchRequest } from "@/services/apiReqServices/authorizedRequest";
import { mutate } from "swr";
import Link from "next/link";
import { orders } from "@/constants";
import Image from "next/image";

function OrderCard({ item }: { item: orderData | sqlOrderData }) {
  const [showModal, setShowModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState<string | undefined>();

  const confirmDelete = async () => {
    try {
      const response = await authorizedPatchRequest("orders/status", {
        orderID: item._id,
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

  const handleEdit = async () => {
    try {
      const response = await authorizedPatchRequest("orders", {
        orderID: item._id,
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
        key={item._id}
        className={` p-6 font-serif rounded-xl w-4/5 mx-auto shadow-lg m-y-2 bg-white  ${
          item.status === "Cancelled" ? "bg-gray-300" : "bg-white"
        } `}
      >
        <div className={`relative`}>
          <p className="text-lg  mt-2">
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
            <h4 className="text-xl font-semibold ">Items</h4>
            <Link href={`/orders/${item._id}`}>
              <div className="grid grid-cols-1  gap-6 ">
                {item.items && item.items.length > 0 ? (
                  item.items.map((item) => (
                    <div
                      key={
                        isSqlDBOrderItem(item)
                          ? item.productId
                          : item.productID._id
                      }
                      className=" p-4 rounded-lg shadow-lg flex items-center border-gray-200 border"
                    >
                      <Image
                        width={240}
                        height={240}
                        src={
                          isSqlDBOrderItem(item)
                            ? item.productThumbnail
                            : item.productID.productThumbnail
                        }
                        alt={
                          isSqlDBOrderItem(item)
                            ? item.productName
                            : item.productID.productName
                        }
                        className="w-24 h-24 object-cover rounded-lg shadow-lg"
                      />
                      <div className="ml-4">
                        <p className="text-lg font-semibold ">
                          {isSqlDBOrderItem(item)
                            ? item.productName
                            : item.productID.productName}
                        </p>
                        <p className="text-sm ">
                          {orders.PRICE}: ₹
                          {isSqlDBOrderItem(item)
                            ? item.productPrice
                            : item.productID.productPrice}
                        </p>
                        <p className="text-sm ">
                          {orders.QUNATITY}: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm ">{orders.NO_ITEMS}</p>
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
          <div className="mt-6 flex gap-x-1  items-center justify-between">
            <div className="flex items-center">
              {!isEdit ? (
                <>
                  <p className="text-sm ">
                    {orders.ADDRESS}:{" "}
                    {isSqlDBOrder(item)
                      ? `${item.state}, ${item.city}, ${item.pincode}, ${item.locality}, ${item.address}`
                      : `${item.address.state}, ${item.address.city}, ${item.address.pincode}, ${item.address.locality}, ${item.address.address}`}
                  </p>
                </>
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    className="border-gray-400 border outline-none"
                  ></textarea>
                  <div className="text-green-400" onClick={handleEdit}>
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
            {item.status !== "Cancelled" && (
              <div
                className="flex justify-center w-1/5 items-center gap-x-1 text-red-500 cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                <p className="text-sm md:text-base">Cancel order</p>
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
