// components/Toast.tsx
"use client";
import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  // Auto-close the toast after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-hide toast after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 w-80 p-3 rounded-lg shadow-md ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white flex items-center justify-between`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-3 text-white">
        &times;
      </button>
    </div>
  );
};

export default Toast;
