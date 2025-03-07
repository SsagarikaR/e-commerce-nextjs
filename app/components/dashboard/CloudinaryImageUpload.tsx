"use client";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

interface cloudinaryImageUploadProps {
  seturl: (url: string) => void;
}

function CloudinaryImageUpload({ seturl }: cloudinaryImageUploadProps) {
  return (
    <CldUploadWidget
      uploadPreset="psmzaqa4"
      onSuccess={(results: CloudinaryUploadWidgetResults) => {
        const info = results.info;

        // Ensure info is not undefined and is the expected type
        if (info && typeof info !== "string" && "secure_url" in info) {
          const imageUrl = info.secure_url;
          seturl(imageUrl); // Pass the URL to the parent component
        }
      }}
    >
      {({ open }) => (
        <button
          type="button"
          className="bg-blue-300 p-2 rounded-lg hover:bg-blue-400"
          onClick={() => open()}
        >
          Upload
        </button>
      )}
    </CldUploadWidget>
  );
}

export default CloudinaryImageUpload;
