import React from "react";

interface InputFieldProps {
  id: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  type: string;
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  value,
  onChange,
  placeholder,
  type,
}) => {
  return (
    <div className="mb-6">
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={4}
          className="w-full  p-3  border border-gray-300 rounded-lg shadow-sm focus:outline-none dark:text-black focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none dark:text-black focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputField;
