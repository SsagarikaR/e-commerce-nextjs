import { useState } from "react";

export function useFormSubmit<T extends Record<string, any>>(
  initialFormData: T,
  apiAction: (form: FormData) => Promise<any>
) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<any>({});
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
      if (result.errors) {
        setErrors(result.errors); // Set errors if validation fails
      } else {
        setErrors({}); // Clear errors on successful submission
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
