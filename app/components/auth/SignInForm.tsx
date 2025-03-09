//@ts-nocheck
"use client";
import React, { useState } from "react";
import Input from "./Input";
import Toast from "../toast/Toast";
import { signinUserAction } from "@/actions/signInAction";
import { useActionState } from "react";

function SignInForm() {
  // Define the initial state to match the required types
  const initialState = {
    message: "",
    errors: {
      email: [],
      password: [],
    },
  };

  const [error, action, isLoading] = useActionState(
    signinUserAction,
    initialState
  );
  console.log(error, "err");

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Handle error message from server-side (general error or form errors)
  React.useEffect(() => {
    if (error?.errors?.message) {
      setToastMessage(error?.errors?.message);
      setToastType("error"); // Show error type for non-field errors
      setToastVisible(true);
    }
  }, [error]);

  const inputField = [
    { id: "email", field: "Email", type: "text" },
    { id: "password", field: "Password", type: "password" },
  ];

  return (
    <>
      <form className="w-full" action={action}>
        <div className="w-full">
          {inputField.map((input) => (
            <Input
              key={input.id}
              field={input.field}
              id={input.id}
              type={input.type}
              error={error?.errors?.[input.id] || undefined}
            />
          ))}
          <button
            type="submit"
            className="w-full h-[48px] bg-blue-400 rounded-lg shadow-md text-white font-semibold text-lg cursor-pointer"
          >
            {!isLoading ? "Sign In" : "signing in..."}
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

export default SignInForm;
