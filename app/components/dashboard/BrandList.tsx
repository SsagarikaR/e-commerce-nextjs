"use client";
import useSWR, { mutate } from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";
import { useState } from "react";
import ConfirmModal from "../confirmModal.tsx/ConfirmModal"; // Import the reusable ConfirmModal
import { authorizedDeleteRequest } from "@/services/apiReqServices/authorizedRequest";
import { dashboard_brand } from "@/constants";
import { fetcher } from "@/lib/helpers/unAuthorizedGetFetcher";

function BrandList() {
  const { data: brands, error } = useSWR<brands[], Error>(`brands`, fetcher);

  const [showModal, setShowModal] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<number | null>(null);

  // Handle delete brand
  const handleDelete = async (brandID: number) => {
    setBrandToDelete(brandID); 
    setShowModal(true); 
  };

  // Confirm delete and make the API call
  const confirmDelete = async () => {
    try {
      const response = await authorizedDeleteRequest(`brands`,{brandID:brandToDelete});

      if (response.status === 200) {
        // If successful, refetch the brand list
        mutate("brands");
        setShowModal(false); 
      } else {
        console.error("Failed to delete brand");
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full mt-10 text-lg text-gray-700  h-[700px] overflow-auto">
      <table className="border w-full border-collapse">
        <thead>
          <tr>
            <th className="border-2 p-2">{dashboard_brand.BRAND_NAME}</th>
            <th className="border-2 p-2">{dashboard_brand.ACTION}</th>
          </tr>
        </thead>
        <tbody>
          {brands && brands.length > 0 ? (
            brands.map((item) => (
              <tr key={item.brandID}>
                <td className="border-2 p-2">
                  <div className="flex space-x-2 items-center">
                    <img
                      src={item.brandThumbnail}
                      className="w-16 border-gray-200 border shadow-md p-2"
                    />
                    <div>{item.brandName}</div>
                  </div>
                </td>
                <td className="border-2 p-2">
                  <div className="flex space-x-2">
                    {/* <FontAwesomeIcon icon={faEdit} className="w-5" /> */}
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="w-5 cursor-pointer"
                      onClick={() => handleDelete(item.brandID)} // Trigger delete on click
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
            <td colSpan={2} className="text-center">{dashboard_brand.NO_BRAND}</td>
          </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Confirmation */}
      <ConfirmModal
        isOpen={showModal}
        title="Are you sure you want to delete this brand?"
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)} // Close modal without deleting
      />
    </div>
  );
}

export default BrandList;
