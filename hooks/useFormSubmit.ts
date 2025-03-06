import { useState } from "react";
import { useRef } from "react";

export type FormSubmitResult = {
  success?: string;
  errors?: Record<string, string[] | string | undefined>; // Updated to allow arrays of errors
};

export function useFormSubmit<T extends Record<string, number | string>>(
  initialFormData: T,
  apiAction: (form: FormData) => Promise<FormSubmitResult>
) {
  const [formData, setFormData] = useState(initialFormData);
  const errors = useRef<Record<string, string | string[] | undefined>>({}); // Using a ref for errors
  const [loading, setLoading] = useState(false);

  // Handle input change, allowing for a custom event-like object
  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new FormData object
    const form = new FormData();

    // Append formData to FormData object
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key as keyof T] as string);
    });

    try {
      setLoading(true);
      const result = await apiAction(form);
      console.log(result, "result");

      if (result.errors) {
        console.log(result.errors, "result.errors");
        errors.current = result.errors; // Save errors to ref
      } else {
        errors.current = {}; // Clear errors on success
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
}
