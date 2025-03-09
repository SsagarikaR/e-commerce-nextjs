// @ts-nocheck
"use client";

import React, { useState } from "react";
import Input from "./Input";
import Toast from "../toast/Toast";
import { signinUserAction } from "@/actions/signInAction";
import { useActionState } from "react";

function SignInForm() {
  // Define the initial state to match the required types
  const initialState = {
    success: "",
    errors: {
      email: [],
      password: [],
    },
  };
  // Use `useActionState` with the correct types

  const [error, action, isLoading] = useActionState(
    signinUserAction,
    initialState
  );
  console.log(error, "err");

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

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
            `${isLoading ? "Sign In" : "signing in..."}`
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
