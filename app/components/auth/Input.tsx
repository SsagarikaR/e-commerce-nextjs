import React from "react";

function Input({ field, id, type, error }: InputProps) {
  return (
    <div className={`relative mb-9 ${id === "password" ? "space-y-2" : ""}`}>
      <input
        className="w-[90%] p-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-800 font-medium text-lg focus:outline-none"
        id={id}
        type={type}
        placeholder={`Enter your ${field}`}
        name={id}
      />
      {error && (
        <div
          className={`${!(type === "password") && "absolute"} left-7 text-red-500 text-sm mt-1`}
        >
          {error}
        </div>
      )}{" "}
      {/* Display error if exists */}
    </div>
  );
}

export default Input;
