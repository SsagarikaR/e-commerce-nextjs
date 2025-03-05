"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import CloudinaryImageUpload from "./CloudinaryImageUpload"; 
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest"; 
import { dashboard_catgeory } from "@/constants";
import { addCategoryAction } from "@/actions/addCategoryAction";
import Input from "./Input";

function AddCategories() {
  const [formData, setFormData] = useState<{
    categoryName: string;
    categoryThumbnail: string;
    }>({
    categoryName: "",
    categoryThumbnail: "", 
  });

  const [errors, setErrors] = useState<{
    categoryName: string;
    categoryThumbnail: string;
    }>({
      categoryName: "",
      categoryThumbnail: "",
    });

  const router = useRouter(); 

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, categoryThumbnail: url })); 
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form=new FormData(e.target as HTMLFormElement)
    form.append("categoryThumbnail", formData.categoryThumbnail); 
    const result=await addCategoryAction(form);
    console.log(result,"result")
    console.log(form,"send form data")

    if (result.errors) {
      // If there are errors, you can set the errors in the state
      setErrors((prev) => ({
        categoryName: result.errors.categoryName ?result.errors.categoryName[0]: "",
        categoryThumbnail: result.errors.categoryThumbnail ?result.errors.categoryThumbnail[0]: "" 
      }));

      return; // If there are errors, stop form submission
    }


    try {
      const response = await authorizedPostRequest("categories", formData);
      console.log(response);
      router.push("/dashboard/categories"); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputFields=[
    {
      id:"catgeoryName",
      field:"category name",
      value:formData.categoryName,
      error:errors.categoryName,
    }
  ]

  

  return (
    <div className="pt-10 w-full flex flex-col gap-4">
      <div className="text-3xl font-semibold">{dashboard_catgeory.ADD_CATGEORY}</div>
      <form
        className="border-2 p-4 w-full flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {/* Category Name */}
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


        {/* Category Thumbnail (Cloudinary Upload) */}
        <div className="w-full flex relative pb-6">
          <label className="text-xl w-2/5">{dashboard_catgeory.ENTER_CATEGORY_THUMBNAIL}</label>
          <CloudinaryImageUpload seturl={handleImageUpload} />
          {errors.categoryThumbnail && <p className="text-red-500 text-sm">{errors.categoryThumbnail}</p>}
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
