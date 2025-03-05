"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

function CloudinaryImageUpload({ seturl }: cloudinaryImageUploadProps) {
  return (
    <CldUploadWidget
      uploadPreset="psmzaqa4"
      onSuccess={({ info }) => {
        const imageUrl = info?.secure_url; // This is the URL of the uploaded image
        seturl(imageUrl); // Pass the URL to the parent component
      }}
    >
      {({ open }) => (
        // Add type="button" to prevent the form from submitting when clicking this button
        <button
          type="button"
          className="bg-purple-300 p-2 rounded-lg hover:bg-purple-400"
          onClick={() => open()}
        >
          Upload
        </button>
      )}
    </CldUploadWidget>
  );
}

export default CloudinaryImageUpload;
