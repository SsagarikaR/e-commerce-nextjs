import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import CloudinaryImageUpload from "./CloudinaryImageUpload";
import { dashboard_brand } from "@/constants";
import { addBrandAction } from "@/actions/addBrandAction";
import { useFormSubmit } from "@/hooks/useFormSubmit"; // Import the custom hook
import Input from "./Input";

function AddBrands() {
  const { formData, errors, handleChange, handleSubmit } = useFormSubmit(
    { brandName: "", brandThumbnail: "" },
    addBrandAction
  );

  const router = useRouter(); // Initialize the useRouter hook

  const inputFields = [
    {
      id: "brandName",
      field: "brand name",
      value: formData.brandName,
      error: errors.brandName,
    },
  ];

  // Update handleSubmit to include redirect after success
  const handleFormSubmit = async (e: React.FormEvent) => {
    // Call the original handleSubmit function from useFormSubmit
    await handleSubmit(e);

    // If form submission is successful, redirect to /dashboard/brand
    if (!errors.brandName && !errors.brandThumbnail) {
      router.push("/dashboard/brands");
    }
  };

  return (
    <div className="pt-10 w-full flex flex-col gap-4">
      <div className="text-3xl font-semibold">{dashboard_brand.ADD_BRAND}</div>
      <form
        className="border-2 p-4 w-full flex flex-col gap-6"
        onSubmit={handleFormSubmit} // Use the updated submit handler
      >
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

        <div className="w-full flex relative pb-6">
          <label className="text-xl w-2/5">
            {dashboard_brand.ENTER_BARND_THUMBNAIL}
          </label>
          <CloudinaryImageUpload
            seturl={(url: string) => {
              handleChange({ target: { name: "brandThumbnail", value: url } });
            }}
          />
          {errors.brandThumbnail && (
            <p className="text-red-500 text-sm">{errors.brandThumbnail}</p>
          )}
        </div>

        {formData.brandThumbnail && (
          <div className="w-full flex pb-6">
            <label className="text-xl w-2/5">
              {dashboard_brand.IMAGE_PREVIEW}
            </label>
            <div className="w-3/5">
              <img
                src={formData.brandThumbnail}
                alt="Uploaded Thumbnail"
                className="w-[200px] h-[200px] border border-gray-400 p-2 rounded-md"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end items-center">
          <button
            className="bg-purple-400 px-10 py-2 text-lg font-semibold text-black rounded-md"
            type="submit"
            disabled={false}
          >
            {dashboard_brand.ADD_BRAND_BTN}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBrands;
