"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Added to handle redirection after submission
import CloudinaryImageUpload from "./CloudinaryImageUpload"; // Assuming this is your Cloudinary image upload component
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest"; // API request function
import { dashboard_catgeory } from "@/constants";

function AddCategories() {
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryThumbnail: "", // This will store the Cloudinary image URL for the category thumbnail
  });

  const router = useRouter(); // Used for redirection after successful submission

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image URL from Cloudinary upload
  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, categoryThumbnail: url })); // Store the Cloudinary URL in the form data
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Sending data to the backend API to create a category
      const response = await authorizedPostRequest("categories", formData);
      console.log(response);
      router.push("/dashboard/categories"); // Redirect to the categories list page
    } catch (error) {
      console.error("Error:", error);
      // Handle the error (show error message to the user)
    }
  };

  return (
    <div className="pt-10 w-full flex flex-col gap-4">
      <div className="text-3xl font-semibold">{dashboard_catgeory.ADD_CATGEORY}</div>
      <form
        className="border-2 p-4 w-full flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {/* Category Name */}
        <div className="w-full flex pb-6 relative">
          <label className="text-xl w-2/5">{dashboard_catgeory.ENTER_CATGEORY_NAME}</label>
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            className="border border-gray-400 px-4 py-2 w-3/5"
            required
          />
        </div>

        {/* Category Thumbnail (Cloudinary Upload) */}
        <div className="w-full flex relative pb-6">
          <label className="text-xl w-2/5">{dashboard_catgeory.ENTER_CATEGORY_THUMBNAIL}</label>
          <CloudinaryImageUpload seturl={handleImageUpload} />
        </div>

        {/* Display Uploaded Image Preview */}
        {formData.categoryThumbnail && (
          <div className="w-full flex pb-6">
            <label className="text-xl w-2/5">{dashboard_catgeory.IMAGE_PREVIEW}</label>
            <div className="w-3/5">
              <img
                src={formData.categoryThumbnail}
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
           {dashboard_catgeory.ADD_CATGEORY_BTN}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategories;
