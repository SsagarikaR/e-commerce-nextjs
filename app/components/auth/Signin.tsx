"use client"
import React, { useState } from 'react'
import Input from './Input';
import Link from 'next/link';
import { signinUserAction } from '@/actions/signinSchema';
import { unAuthorizedPOSTRequest } from '@/services/apiReqServices/unAuthorizedRequest';

function Signin() {
  // Define a type for the form data, where keys are 'email' and 'password'
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });


  const [successMsg, setSuccessMsg] = useState('');


  const inputField = [
    { id: "email", field: "Email", type: "text" },
    { id: "password", field: "Password", type: "password" },
  ];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    const form = new FormData(e.target as HTMLFormElement);
    console.log(e.target as HTMLFormElement);

    const result = await signinUserAction(form); // Call server-side action
    console.log(formData)
    // Handle validation errors if any
    if (result.errors) {
      setErrors({
        email: result.errors.email ? result.errors.email.join(' ') : '',
        password: result.errors.password ? result.errors.password.join(' ') : '',
      });
      console.log(errors)
      setSuccessMsg('');
    } else if (result.success) {
      unAuthorizedPOSTRequest("auth/signin",formData)
      setSuccessMsg(result.success); 
      setErrors({ email: '', password: '' }); // Clear any errors
    }
  };

  return (
    <div className="flex min-h-screen min-w-full justify-center items-center bg-gradient-to-r from-gray-200 to-blue-200">
      <div className="relative w-[900px] h-[580px] bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-white flex flex-col items-center text-gray-800 text-center z-10 p-10">
          <h1 className="text-4xl mb-4">Sign in</h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full">
              {inputField.map((input) => {
                // Use 'keyof typeof formData' to ensure input.id matches keys in formData
                return (
                  <Input
                    key={input.id}
                    field={input.field}
                    id={input.id}
                    type={input.type}
                    value={formData[input.id as keyof typeof formData]} // Safe indexing
                    onChange={(e) => {setFormData({ ...formData, [input.id]: e.target.value }); console.log(formData); console.log(e.target.value); console.log(input.id)}}
                    error={errors[input.id as keyof typeof errors]} // Safe indexing for error
                  />
                );
              })}
              <button
                type="submit"
                className="w-full h-[48px] bg-blue-400 rounded-lg shadow-md text-white font-semibold text-lg mt-4 cursor-pointer"
              >
                {`Sign IN`}
              </button>
              {successMsg && <p className="text-green-500 mt-4">{successMsg}</p>}
            </div>
          </form>
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-0 before:absolute before:w-[300%] before:left-[-250%] before:h-full before:bg-blue-400 before:rounded-full before:z-10">
          <div className="absolute w-[50%] h-full flex flex-col justify-center items-center text-white z-20 p-6">
            <h1 className="text-4xl mb-4">Hello, welcome!</h1>
            <p className="mb-4">Don't have an account?</p>
            <Link href="/signup">
              <button className="w-[160px] h-[46px] border-2 border-white bg-transparent text-white font-medium">
                {`Sign Up`}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
