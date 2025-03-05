// components/ProductList.tsx
"use client";
import useSWR, { mutate } from "swr";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../pagination/Pagination"; // Assuming Pagination component is in the same folder
import { useState } from "react";
import { authorizedDeleteRequest } from "@/services/apiReqServices/authorizedRequest";
import ConfirmModal from "../confirmModal.tsx/ConfirmModal"; // Import the Modal component
import {  dashboard_product } from "@/constants";
import { fetcher } from "@/lib/helpers/unAuthorizedGetFetcher";

function ProductList({ page }: { page: number }) {
  const { data: products, error } = useSWR<products[], Error>(
    `products?page=${page}&limit=8`,
    fetcher
  );

  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  // Handle loading state
  if (!products) {
    return <div>Loading products...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  let totalPages:number;

  if(products.length>0){
    totalPages = Math.ceil(products[0].totalCount / 8);
  }
  
  const currentPage = page;

  const handleDelete = async (productID: number) => {
    setProductToDelete(productID); // Set the product ID to be deleted
    setShowModal(true); // Show the modal
  };

  const confirmDelete = async () => {
    try {
      const response = await authorizedDeleteRequest("products", {
        productID: productToDelete,
      });

      // If successful, refetch the products list
      if (response.status === 200) {
        setShowModal(false);
        mutate(`products?page=${page}&limit=8`);
      } else {
        console.error("Failed to delete product", response?.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      mutate(`products?page=${page}&limit=8`, products, false);
    }
  };

  return (
    <div className="w-full  mt-10  text-lg text-gray-700 h-[700px] xl:h-[800px] overflow-auto">
      <table className="border w-full border-collapse ">
        <thead>
          <tr>
            <th className="border-2 p-2">{dashboard_product.PRODUCT_NAME}</th>
            <th className="border-2 p-2">{dashboard_product.PRICE}</th>
            <th className="border-2 p-2">{dashboard_product.BRAND}</th>
            <th className="border-2 p-2">{dashboard_product.CATEGORY}</th>
            <th className="border-2 p-2">{dashboard_product.STOCK}</th>
            <th className="border-2 p-2">{dashboard_product.ACTION}</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.productID}>
                <td className="border-2 p-2">
                  <div className="flex space-x-2 ">
                    <img
                      src={product.productThumbnail}
                      className="md:w-16 md:h-16 h-12 w-12 border-gray-200 border shadow-md p-2"
                    />
                    <div>{product.productName}</div>
                  </div>
                </td>
                <td className="border-2 p-2">{product.productPrice}</td>
                <td className="border-2 p-2">{product.brandName}</td>
                <td className="border-2 p-2">{product.categoryName}</td>
                <td className="border-2 p-2">{product.stock}</td>
                <td className="border-2 p-2">
                  <div className="flex space-x-2">
                    {/* <FontAwesomeIcon icon={faEdit} className="w-5" /> */}
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="w-5 cursor-pointer"
                      onClick={() => handleDelete(product.productID)} // Trigger delete on click
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>{dashboard_product.NO_PRODUCT}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Component */}
      <Pagination currentPage={currentPage} totalPages={totalPages!} />

      {/* Reusable Modal */}
      <ConfirmModal
        isOpen={showModal}
        title="Are you sure you want to delete this product?"
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default ProductList;
