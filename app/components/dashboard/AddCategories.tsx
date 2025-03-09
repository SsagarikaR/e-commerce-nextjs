"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CloudinaryImageUpload from "./CloudinaryImageUpload";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { dashboard_catgeory } from "@/constants";
import { addCategoryAction } from "@/actions/addCategoryAction";
import Input from "./Input";
import Image from "next/image";

function AddCategories() {
  const { formData, errors, handleChange, handleSubmit } = useFormSubmit(
    { categoryName: "", categoryThumbnail: "" },
    addCategoryAction
  );

  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(e);

    if (
      !errors.current.categoryName &&
      !errors.current.categoryThumbnail &&
      !errors.current.general
    ) {
      router.push("/dashboard/categories");
    }
  };

  const inputFields = [
    {
      id: "categoryName",
      field: "category name",
      value: formData.categoryName,
      error: errors.current.categoryName,
    },
  ];

  return (
    <div className="pt-10 w-full flex flex-col gap-4">
      <div className="text-3xl font-semibold">
        {dashboard_catgeory.ADD_CATGEORY}
      </div>
      <form
        className="border-2 border-gray-400 p-4 w-full flex flex-col gap-6"
        onSubmit={handleFormSubmit}
      >
        {/* Category Name */}
        {inputFields.map((item) => (
          <Input
            key={item.id}
            id={item.id}
            value={item.value}
            field={item.field}
            onChange={handleChange}
            errors={item.error}
          />
        ))}

        {/* Category Thumbnail (Cloudinary Upload) */}
        <div className="w-full flex relative pb-6">
          <label className="text-xl w-2/5">
            {dashboard_catgeory.ENTER_CATEGORY_THUMBNAIL}
          </label>
          <CloudinaryImageUpload
            seturl={(url: string) => {
              console.log("Setting categoryThumbnail URL:", url); // Debug here
              handleChange({
                target: { name: "categoryThumbnail", value: url },
              });
            }}
          />

          {errors.current.categoryThumbnail && (
            <p className="text-red-500 text-sm">
              {errors.current.categoryThumbnail}
            </p>
          )}
        </div>

        {/* Display Uploaded Image Preview */}
        {formData.categoryThumbnail && (
          <div className="w-full flex pb-6">
            <label className="text-xl w-2/5">
              {dashboard_catgeory.IMAGE_PREVIEW}
            </label>
            <div className="w-3/5">
              <Image
                width={200}
                height={200}
                src={formData.categoryThumbnail}
                alt="Uploaded Thumbnail"
                className="w-[200px] h-[200px] border border-gray-400 p-2 rounded-md"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end items-center">
          <button
            className="bg-blue-400 px-10 py-2 text-lg font-semibold text-black rounded-md"
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
