"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Added to handle redirection after submission
import CloudinaryImageUpload from "./CloudinaryImageUpload"; // Assuming this is your Cloudinary image upload component
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest"; // API request function

function AddBrands() {
  const [formData, setFormData] = useState({
    brandName: "",
    brandThumbnail: "", 
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
    setFormData((prev) => ({ ...prev, brandThumbnail: url })); // Store the Cloudinary URL in the form data
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Sending data to the backend API to create a brand
      const response = await authorizedPostRequest("brands", formData);
      console.log(response);
      router.push("/dashboard/brands"); // Redirect to the brands list page
    } catch (error) {
      console.error("Error:", error);
      // Handle the error (show error message to the user)
    }
  };

  return (
    <div className="pt-10 w-full flex flex-col gap-4">
      <div className="text-3xl font-semibold">Add a new Brand</div>
      <form
        className="border-2 p-4 w-full flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {/* Brand Name */}
        <div className="w-full flex pb-6 relative">
          <label className="text-xl w-2/5">Enter brand name</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            className="border border-gray-400 px-4 py-2 w-3/5"
            required
          />
        </div>

        {/* Category Thumbnail (Cloudinary Upload) */}
        <div className="w-full flex relative pb-6">
          <label className="text-xl w-2/5">Brand Thumbnail</label>
          <CloudinaryImageUpload seturl={handleImageUpload} />
        </div>

        {/* Display Uploaded Image Preview */}
        {formData.brandThumbnail && (
          <div className="w-full flex pb-6">
            <label className="text-xl w-2/5">Uploaded Image Preview</label>
            <div className="w-3/5">
              <img
                src={formData.brandThumbnail}
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
            Add Brand
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBrands;
