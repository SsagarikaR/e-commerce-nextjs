"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { authorizedDeleteRequest } from "@/services/apiReqServices/authorizedRequest"; // Assuming this exists to handle authorized requests
import useSWR, { mutate } from "swr";
import { useState } from "react";
import ConfirmModal from "../confirmModal.tsx/ConfirmModal"; // Import the reusable ConfirmModal
import { dashboard_catgeory } from "@/constants";
import { fetcher } from "@/lib/helpers/unAuthorizedGetFetcher";

function CategoryList() {
  const { data: categories, error } = useSWR<categories[], Error>(
    "categories",
    fetcher
  );

  const [showModal, setShowModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  // Handle delete category
  const handleDelete = (categoryID: number) => {
    setCategoryToDelete(categoryID);
    setShowModal(true);
  };

  // Confirm delete and make the API call
  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      const response = await authorizedDeleteRequest("categories", {
        categoryID: categoryToDelete,
      });

      if (response.status === 200) {
        // If successful, refetch the category list
        mutate("categories");
        setShowModal(false);
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full mt-10 text-lg text-gray-700  h-[700px] overflow-auto">
      <table className="border w-full border-collapse">
        <thead>
          <tr>
            <th className="border-2 p-2">{dashboard_catgeory.CTAEGORY_NAME}</th>
            <th className="border-2 p-2">{dashboard_catgeory.ACTION}</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.length > 0 ? (
            categories.map((item) => (
              <tr key={item.categoryID}>
                <td className="border-2 p-2">
                  <div className="flex space-x-2 items-center">
                    <img
                      src={item.categoryThumbnail}
                      className="w-16 border-gray-200 border shadow-md p-2"
                    />
                    <div>{item.categoryName}</div>
                  </div>
                </td>
                <td className="border-2 p-2">
                  <div className="flex space-x-2">
                    {/* <FontAwesomeIcon icon={faEdit} className="w-5" /> */}
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="w-5 cursor-pointer"
                      onClick={() => handleDelete(item.categoryID)} // Trigger delete on click
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center">
                {dashboard_catgeory.NO_CATEGORIES}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Confirmation */}
      <ConfirmModal
        isOpen={showModal}
        title="Are you sure you want to delete this category?"
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)} // Close modal without deleting
      />
    </div>
  );
}

export default CategoryList;
