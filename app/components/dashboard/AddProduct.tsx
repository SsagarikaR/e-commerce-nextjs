"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import CloudinaryImageUpload from "./CloudinaryImageUpload";
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest";
import { dashboard_product } from "@/constants";
import { fetcher } from "@/lib/helpers/unAuthorizedGetFetcher";
import { addProductAction } from "@/actions/addProductAction";
import Input from "./Input";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // FontAwesome Cross Icon

function AddProduct() {
  const { data: brands } = useSWR<brands[], Error>(`brands`, fetcher);
  const { data: categories } = useSWR<categories[], Error>(
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
    productThumbnail: "",
    productImages: [] as string[],
  });

  const [errors, setErrors] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    brandID: "",
    categoryID: "",
    stock: "",
    productThumbnail: "",
    productImages: "",
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
    handleValidationOnChange();
  };

  // Handle image URL from Cloudinary upload
  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, productThumbnail: url }));
    handleValidationOnChange();
  };

  // Handle image upload for additional product images
  const handleAdditionalImageUpload = async (url: string) => {
    console.log(url, "url");
    await setFormData((prev) => ({
      ...prev,
      productImages: [...prev.productImages, url],
    }));
    console.log(formData.productImages, "form data change image");
    handleValidationOnChange();
  };

  // Handle image removal
  const handleImageRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      productImages: prev.productImages.filter((_, i) => i !== index),
    }));
  };

  // Handle input changes and validate immediately
  const handleValidationOnChange = async () => {
    const form = new FormData();
    form.set("productName", formData.productName);
    form.set("productThmbnail", formData.productThumbnail);
    form.set("productPrice", formData.productPrice);
    form.set("productDescription", formData.productDescription);
    form.set("categoryID", formData.categoryID);
    form.set("brandID", formData.brandID);
    form.set("stock", formData.stock);
    console.log(formData.productImages, "prdccut image sihkkgf");
    formData.productImages.forEach((imageUrl) => {
      form.append("productImages[]", imageUrl); // Ensure to append each URL as a separate field
    });
    const result = await addProductAction(form);
    //  console.log(result)
    if (result.errors) {
      setErrors({
        productName: result.errors.productName
          ? result.errors.productName[0]
          : "",
        productThumbnail: result.errors.productThumbnail
          ? result.errors.productThumbnail[0]
          : "",
        productPrice: result.errors.productPrice
          ? result.errors.productPrice[0]
          : "",
        productDescription: result.errors.productDescription
          ? result.errors.productDescription[0]
          : "",
        categoryID: result.errors.categoryID ? result.errors.categoryID[0] : "",
        brandID: result.errors.brandID ? result.errors.brandID[0] : "",
        stock: result.errors.stock ? result.errors.stock[0] : "",
        productImages: result.errors.productImages
          ? result.errors.productImages[0]
          : "",
      });
    } else {
      setErrors({
        productName: "",
        productPrice: "",
        productDescription: "",
        brandID: "",
        categoryID: "",
        stock: "",
        productThumbnail: "",
        productImages: "",
      });
    }
  };

  // Handle form submit (validate fields if there is no error then submit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    form.append("productThumbnail", formData.productThumbnail);
    formData.productImages.forEach((imageUrl) => {
      form.append("productImages", imageUrl);
    });
    const result = await addProductAction(form);
    console.log(formData, "result");
    console.log(formData, "send form data");

    if (result.errors) {
      setErrors({
        productName: result.errors.productName
          ? result.errors.productName[0]
          : "",
        productThumbnail: result.errors.productThumbnail
          ? result.errors.productThumbnail[0]
          : "",
        productPrice: result.errors.productPrice
          ? result.errors.productPrice[0]
          : "",
        productDescription: result.errors.productDescription
          ? result.errors.productDescription[0]
          : "",
        categoryID: result.errors.categoryID ? result.errors.categoryID[0] : "",
        brandID: result.errors.brandID ? result.errors.brandID[0] : "",
        stock: result.errors.stock ? result.errors.stock[0] : "",
        productImages: result.errors.productImages
          ? result.errors.productImages[0]
          : "",
      });

      return;
    }

    try {
      // Sending data to the backend API
      const response = await authorizedPostRequest("products", formData);
      console.log(response);
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputFields = [
    {
      id: "productName",
      field: "product name",
      value: formData.productName,
      error: errors.productName,
    },
    {
      id: "productPrice",
      field: "product price",
      value: formData.productPrice,
      error: errors.productPrice,
    },
    {
      id: "stock",
      field: "product stock",
      value: formData.stock,
      error: errors.stock,
    },
  ];

  return (
    <div className="pt-10 w-full flex flex-col gap-4 ">
      <div className="text-3xl font-semibold">
        {dashboard_product.ADD_PRODUCT}
      </div>
      <form
        className="border-2 border-gray-400 p-4 w-full flex flex-col gap-6 overflow-auto h-[780px] "
        onSubmit={handleSubmit}
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

        {/* Product Description */}
        <div className="w-full flex pb-6 relative">
          <label className="text-xl w-2/5">
            {dashboard_product.ENTER_PRODUCT_DESC}
          </label>
          <textarea
            name="productDescription"
            rows={4}
            value={formData.productDescription}
            onChange={(e) => {
              handleChange(e);
            }}
            className="border border-gray-400 px-4 py-2 w-3/5"
          ></textarea>
          {errors.productDescription && (
            <p className="text-red-500 text-sm absolute bottom-0 pl-[40%]">
              {errors.productDescription}
            </p>
          )}
        </div>

        {/* Product Brand */}
        <div className="w-full flex pb-6 relative">
          <label className="text-xl w-2/5">
            {dashboard_product.ENTER_PRODUCT_BARND}
          </label>
          <select
            name="brandID"
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.brandID}
            className="border border-gray-400 px-4 py-2 w-3/5"
          >
            <option value="" disabled>
              ---{dashboard_product.SLECT_BRAND}---
            </option>{" "}
            {brands &&
              brands.length > 0 &&
              brands?.map((item) => (
                <option key={item.brandID} value={item.brandID}>
                  {item.brandName}
                </option>
              ))}
          </select>
          {errors.brandID && (
            <p className="text-red-500 text-sm absolute bottom-0 pl-[40%]">
              {errors.brandID}
            </p>
          )}
        </div>

        {/* Product Category */}
        <div className="w-full flex pb-6 relative">
          <label className="text-xl w-2/5">
            {dashboard_product.ENTER_RPODUCT_CATGEORY}
          </label>
          <select
            name="categoryID"
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.categoryID}
            className="border border-gray-400 px-4 py-2 w-3/5"
          >
            <option value="" disabled>
              ---{dashboard_product.SLECT_CATEGORY}---
            </option>{" "}
            {categories &&
              categories.length > 0 &&
              categories?.map((item) => (
                <option key={item.categoryID} value={item.categoryID}>
                  {item.categoryName}
                </option>
              ))}
          </select>
          {errors.categoryID && (
            <p className="text-red-500 text-sm absolute bottom-0 pl-[40%]">
              {errors.categoryID}
            </p>
          )}
        </div>

        {/* Product Thumbnail*/}
        <div className="w-full flex relative pb-6">
          <label className="text-xl w-2/5">
            {dashboard_product.ENTER_PRODUCT_THUMBNAIL}
          </label>
          <CloudinaryImageUpload seturl={handleImageUpload} />
          {errors.productThumbnail && (
            <p className="text-red-500 text-sm absolute bottom-0 pl-[40%]">
              {errors.productThumbnail}
            </p>
          )}
        </div>

        {/* Display Uploaded Image Preview */}
        {formData.productThumbnail && (
          <div className="w-full flex pb-6">
            <label className="text-xl w-2/5">
              {dashboard_product.IMAGE_PREVIEW}
            </label>
            <div className="w-3/5">
              <Image
                width={200}
                height={200}
                src={formData.productThumbnail}
                alt="Uploaded Thumbnail"
                className="w-[200px] h-[200px] border border-gray-400 p-2 rounded-md"
              />
            </div>
          </div>
        )}

        {/* Upload Additional Product Images */}
        <div className="w-full flex  relative pb-6">
          <label className="text-xl w-2/5">
            {dashboard_product.UPLOAD_ADDITIONAL_IMAGES}
          </label>
          <CloudinaryImageUpload seturl={handleAdditionalImageUpload} />
          {errors.productImages && (
            <p className="text-red-500 text-sm absolute bottom-0 pl-[40%]">
              {errors.productImages}
            </p>
          )}
        </div>

        {/* Display Uploaded Additional Images in Flex with Cross Mark */}
        <div className="w-full flex flex-wrap gap-4">
          {formData.productImages.map((imgUrl, index) => (
            <div key={index} className="relative">
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => handleImageRemove(index)}
                className="absolute top-0 right-0 w-7 h-7 cursor-pointer"
              />
              <Image
                src={imgUrl}
                alt={`Uploaded Image ${index + 1}`}
                width={100}
                height={100}
                className="w-[100px] h-[100px] border border-gray-400 p-2 rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end items-center">
          <button
            className="bg-blue-400 px-10 py-2 text-lg font-semibold text-black rounded-md"
            type="submit"
            disabled={formData.productImages.length < 2}
          >
            {dashboard_product.ADD_PRODUCT_BTN}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
