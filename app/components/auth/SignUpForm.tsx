"use client";
import Input from "./Input";
import { unAuthorizedPostRequest } from "@/services/apiReqServices/unAuthorizedRequest";
import { useState } from "react";
import { signupUserAction } from "@/actions/signupAction";
import { redirect } from "next/navigation";
import Toast from "../toast/Toast";

function SignUpForm() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    contactNo: string;
    name: string;
  }>({
    email: "",
    password: "",
    contactNo: "",
    name: "",
  });

  const [errors, setErrors] = useState<{
    email: string;
    password: string;
    contactNo: string;
    name: string;
  }>({
    email: "",
    password: "",
    contactNo: "",
    name: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const result = await signupUserAction(form);

    // Handle validation errorsy
    if (result.errors) {
      setErrors({
        email: result.errors.email ? result.errors.email.join(" ") : "",
        password: result.errors.password
          ? result.errors.password.join(" ")
          : "",
        contactNo: result.errors.contactNo
          ? result.errors.contactNo.join(" ")
          : "",
        name: result.errors.name ? result.errors.name.join(" ") : "",
      });
      setSuccessMsg("");
    } else if (result.success) {
      const response = await unAuthorizedPostRequest("auth/signup", formData);
      console.log("response", "response", response);
      if (response.token) {
        setSuccessMsg(result.success);
        setErrors({ email: "", password: "", contactNo: "", name: "" });
        redirect("/home");
      } else {
        setToastMessage(
          response.response.data.message || response.response.data.error
        );
        setToastType("error");
        setToastVisible(true);
      }
    }
  };

  // Handle input changes and validate immediately
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));

    const form = new FormData();
    form.set("email", formData.email);
    form.set("password", formData.password);
    form.set("contactNo", formData.contactNo);
    form.set("name", formData.name);
    form.set(name, value);

    const result = await signupUserAction(form);
    //  console.log(result)
    if (result.errors) {
      setErrors({
        email: result.errors.email ? result.errors.email.join(" ") : "",
        password: result.errors.password
          ? result.errors.password.join(" ")
          : "",
        contactNo: result.errors.contactNo
          ? result.errors.contactNo.join(" ")
          : "",
        name: result.errors.name ? result.errors.name.join(" ") : "",
      });
    } else {
      setErrors({ email: "", password: "", contactNo: "", name: "" });
    }
  };

  const inputField = [
    {
      id: "name",
      field: "Name",
      type: "text",
    },
    {
      id: "email",
      field: "Email",
      type: "text",
    },
    {
      id: "contactNo",
      field: "Contact",
      type: "text",
    },
    {
      id: "password",
      field: "Password",
      type: "password",
    },
  ];
  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="w-full">
          {inputField.map((input) => {
            return (
              <Input
                key={input.id}
                field={input.field}
                id={input.id}
                type={input.type}
                value={formData[input.id as keyof typeof formData]}
                onChange={handleChange}
                error={errors[input.id as keyof typeof errors]}
              />
            );
          })}
          <button
            type="submit"
            className="w-full h-[48px] bg-blue-400 rounded-lg shadow-md text-white font-semibold text-lg mt-4 cursor-pointer"
          >
            {`Sign Up`}
          </button>
        </div>
      </form>
      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastVisible(false)}
        />
      )}
    </>
  );
}

export default SignUpForm;
