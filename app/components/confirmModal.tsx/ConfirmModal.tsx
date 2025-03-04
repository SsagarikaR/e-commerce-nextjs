import { modal_btn } from "@/constants";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl mb-4">{title}</h2>
        <div className="flex justify-between">
          <button
            className="bg-red-400 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            {modal_btn.CANCEL}
          </button>
          <button
            className="bg-purple-400 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            {modal_btn.CONFIRM}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
