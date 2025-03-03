"use client";
import React, { useState } from "react";
import useSWR from "swr"; // Import SWR
import { useRouter } from "next/navigation"; // Added to handle redirection after submission
import CloudinaryImageUpload from "./CloudinaryImageUpload";
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest";
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";
import { dashboard_product } from "@/constants";

// Fetch product data using SWR
const fetcher = async (url: string) => {
  try {
    const response = await unAuthorizedGetRequest(url);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
};

function AddProduct() {
  const { data: brands } = useSWR<brands[], Error>(`brands`, fetcher);
  const { data: categories, error } = useSWR<categories[], Error>(
    "categories",
    fetcher
  );

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    brandID: "",
    categoryID: "",
    stock: "",
    productThumbnail: "", // This will store the Cloudinary image URL
  });

  const router = useRouter(); // Used for redirection after successful submission

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image URL from Cloudinary upload
  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, productThumbnail: url })); // Store the Cloudinary URL in the form data
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Sending data to the backend API
      const response = await authorizedPostRequest("products", formData);
      console.log(response);
        router.push("/dashboard/products");
        // Handle the error (show error message to the user)
    } catch (error) {
      console.error("Error:", error);
      // Handle the error (show error message to the user)
    }
  };

  return (
    <div className="pt-10 w-full flex flex-col gap-4">
      <div className="text-3xl font-semibold">{dashboard_product.ADD_PRODUCT}</div>
      <form
        className="border-2 p-4 w-full flex flex-col gap-6 overflow-auto"
        onSubmit={handleSubmit}
      >
        {/* Product Name */}
        <div className="w-full flex pb-6 relative">
          <label className="text-xl w-2/5">{dashboard_product.ENTER_PRODUCT_NAME}</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="border border-gray-400 px-4 py-2 w-3/5"
          />
        </div>

        {/* Product Price */}
        <div className="w-full flex pb-6 relative">
          <label className="text-xl w-2/5">{dashboard_product.ENTER_PRODUCT_PRICE}</label>
          <input
            type="text"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            className="border border-gray-400 px-4 py-2 w-3/5"
          />
        </div>

        {/* Product Description */}
        <div className="w-full flex pb-6 relative">
          <label className="text-xl w-2/5">{dashboard_product.ENTER_PRODUCT_DESC}</label>
          <textarea
            name="productDescription"
            rows={4}
            value={formData.productDescription}
            onChange={handleChange}
            className="border border-gray-400 px-4 py-2 w-3/5"
          ></textarea>
        </div>

        {/* Product Brand */}
        <div className="w-full flex pb-6 relative">
          <label className="text-xl w-2/5">{dashboard_product.ENTER_PRODUCT_BARND}</label>
          <select
            name="brandID"
            onChange={handleChange}
            value={formData.brandID}
            className="border border-gray-400 px-4 py-2 w-3/5"
          >
            <option value="" disabled>
              ---{dashboard_product.SLECT_BRAND}---
            </option>{" "}
            {/* This will be the default disabled option */}
            {(brands && brands.length>0)&&(brands?.map((item) => (
              <option key={item.brandID} value={item.brandID}>
                {item.brandName}
              </option>
            )))}
          </select>
        </div>

        {/* Product Category */}
        <div className="w-full flex pb-6 relative">
          <label className="text-xl w-2/5">{dashboard_product.ENTER_RPODUCT_CATGEORY}</label>
          <select
            name="categoryID"
            onChange={handleChange}
            value={formData.categoryID}
            className="border border-gray-400 px-4 py-2 w-3/5"
          >
            <option value="" disabled>
              ---{dashboard_product.SLECT_CATEGORY}---
            </option>{" "}
            {/* This will be the default disabled option */}
            {(categories && categories.length>0)&&(categories?.map((item) => (
              <option key={item.categoryID} value={item.categoryID}>
                {item.categoryName}
              </option>
            )))}
          </select>
        </div>
        {/* Product Stock */}
        <div className="w-full flex pb-6 relative">
          <label className="text-xl w-2/5">{dashboard_product.ENTER_PRODUCT_STOCK}</label>
          <input
            type="text"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="border border-gray-400 px-4 py-2 w-3/5"
          />
        </div>

        {/* Product Thumbnail (Cloudinary Upload) */}
        <div className="w-full flex relative pb-6">
          <label className="text-xl w-2/5">{dashboard_product.ENTER_PRODUCT_THUMBNAIL}</label>
          <CloudinaryImageUpload seturl={handleImageUpload} />
        </div>

        {/* Display Uploaded Image Preview */}
        {formData.productThumbnail && (
          <div className="w-full flex pb-6">
            <label className="text-xl w-2/5">{dashboard_product.IMAGE_PREVIEW}</label>
            <div className="w-3/5">
              <img
                src={formData.productThumbnail}
                alt="Uploaded Thumbnail"
                className="w-full h-auto border border-gray-400 p-2 rounded-md"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end items-center">
          <button
            className="bg-purple-400 px-10 py-2 text-lg font-semibold text-black rounded-md"
            type="submit"
          >
            {dashboard_product.ADD_PRODUCT_BTN}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
