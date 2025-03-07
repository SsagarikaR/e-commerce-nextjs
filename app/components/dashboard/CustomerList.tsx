"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest";
import useSWR, { mutate } from "swr";
import Toast from "../toast/Toast";
import { dashboard_customer } from "@/constants";
import { fetcher } from "@/lib/helpers/authorizedGetFetcher";

function CustomerList() {
  const { data: customers, error } = useSWR<user[], Error>("users", fetcher); // Fetch customers using the fetcher function
  const [toastVisible, setToastVisible] = useState(false); // State for showing/hiding the toast
  const [toastMessage, setToastMessage] = useState(""); // The toast message
  const [toastType, setToastType] = useState<"success" | "error">("success"); // Type of toast (success or error)

  // Handle adding a user as admin
  const handleAddAdmin = async (userID: number) => {
    try {
      const response = await authorizedPostRequest("admin", { userID }); // Send POST request to add the user as an admin
      console.log(response);
      setToastMessage(response.message);
      setToastType("success");
      setToastVisible(true);
      mutate("users");
    } catch (error) {
      setToastMessage("An error occurred while submitting the review.");
      setToastType("error");
      setToastVisible(true);
      console.error("Error adding admin:", error);
    }
  };

  if (error) return <div>Error loading customers</div>;
  if (!customers) return <div>Loading...</div>;

  return (
    <div className="w-full mt-24 text-lg text-gray-700 h-[800px] overflow-auto">
      <table className="border w-full border-collapse">
        <thead>
          <tr>
            <th className="border-2 border-gray-400 p-2">
              {dashboard_customer.CUSTOMER_NAME}
            </th>
            <th className="border-2 border-gray-400 p-2">
              {dashboard_customer.CONTACT_NO}
            </th>
            <th className="border-2 border-gray-400 p-2">
              {dashboard_customer.EMAIL}
            </th>
            <th className="border-2 border-gray-400 p-2">
              {dashboard_customer.ADD_AS_ADMIN}
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((item) => (
              <tr key={item.userID}>
                <td className="border-2 border-gray-400 p-2">{item.name}</td>
                <td className="border-2 border-gray-400 p-2">
                  {item.contactNo}
                </td>
                <td className="border-2 border-gray-400 p-2">{item.email}</td>
                <td className="border-2 border-gray-400 p-2">
                  <div className="flex space-x-2 items-center justify-center">
                    {item.role === "Admin" ? (
                      <div className="text-green-600">
                        <FontAwesomeIcon icon={faCheck} className="w-8 h-8" />
                      </div>
                    ) : (
                      <div>
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          className="w-8 h-8 cursor-pointer"
                          onClick={() => handleAddAdmin(item.userID)} // Add user as admin when clicked
                        />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
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

export default CustomerList;
