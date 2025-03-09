// @ts-nocheck
"use client";
import Input from "./Input";
import { useState } from "react";
import Toast from "../toast/Toast";
import { useActionState } from "react";
import { signupUserAction } from "@/actions/signupAction";

function SignUpForm() {
  const initialState = {
    success: "",
    errors: {
      email: [],
      password: [],
      contactNo: [],
      name: [],
    },
  };
  const [error, action, isLoading] = useActionState(
    signupUserAction,
    initialState
  );
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

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
      <form className="w-full" action={action}>
        <div className="w-full">
          {inputField.map((input) => {
            return (
              <Input
                key={input.id}
                field={input.field}
                id={input.id}
                type={input.type}
                error={error?.errors?.[input.id] || undefined}
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
