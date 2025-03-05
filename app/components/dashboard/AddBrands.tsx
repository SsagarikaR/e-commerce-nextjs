"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CloudinaryImageUpload from "./CloudinaryImageUpload"; 
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest"; 
import { dashboard_brand } from "@/constants";
import { addBrandAction } from "@/actions/addBrandAction";
import Input from "./Input";

function AddBrands() {
  const [formData, setFormData] = useState({
    brandName: "",
    brandThumbnail: "", 
  });

   const [errors, setErrors] = useState<{
        brandName: string;
        brandThumbnail: string;
      }>({
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
    setFormData((prev) => ({ ...prev, brandThumbnail: url })); 
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     const form=new FormData(e.target as HTMLFormElement)
        form.append("barndThumbnail", formData.brandThumbnail);
        const result=await addBrandAction(form);
        console.log(result,"result")
        console.log(form,"send form data")
    
        if (result.errors) {
          // If there are errors, you can set the errors in the state
          setErrors((prev) => ({
            brandName: result.errors.brandName ?result.errors.brandName[0]: "",
            brandThumbnail: result.errors.brandThumbnail ?result.errors.brandThumbnail[0]: "" 
          }));
    
          return; 
        }

    try {
      // Sending data to the backend API to create a brand
      const response = await authorizedPostRequest("brands", formData);
      console.log(response);
      router.push("/dashboard/brands"); // Redirect to the brands list page
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const inputFields=[
    {
      id:"brandName",
      field:"brand name",
      value:formData.brandName,
      error:errors.brandName,
    }
  ]

  return (
    <div className="pt-10 w-full flex flex-col gap-4">
      <div className="text-3xl font-semibold">{dashboard_brand.ADD_BRAND}</div>
      <form
        className="border-2 p-4 w-full flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {/* Brand Name */}
        {
          inputFields.map((item)=>(
            <Input                                                                  
            key={item.id}
            id={item.id}
            value={item.value}
            field={item.field}
            onChange={handleChange}
            errors={item.error}/>
          ))
        }


        {/* Brand Thumbnail (Cloudinary Upload) */}
        <div className="w-full flex relative pb-6">
          <label className="text-xl w-2/5">{dashboard_brand.ENTER_BARND_THUMBNAIL}</label>
          <CloudinaryImageUpload seturl={handleImageUpload} />
          {errors.brandThumbnail && <p className="text-red-500 text-sm">{errors.brandThumbnail}</p>}
        </div>

        {/* Display Uploaded Image Preview */}
        {formData.brandThumbnail && (
          <div className="w-full flex pb-6">
            <label className="text-xl w-2/5">{dashboard_brand.IMAGE_PREVIEW}</label>
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
            {dashboard_brand.ADD_BRAND_BTN}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBrands;
