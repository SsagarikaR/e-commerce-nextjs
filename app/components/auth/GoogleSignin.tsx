"use client";
import React from "react";
import Image from "next/image";
import googleIcon from "../../../public/google.png";
import { signIn } from "next-auth/react";

function GoogleSignin() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <div
      className="flex justify-center cursor-pointer items-center mt-10 gap-x-3 shadow-md border px-10 py-2 rounded-md"
      onClick={handleClick}
    >
      <div>
        <Image width={25} height={25} src={googleIcon} alt="google icon" />
      </div>
      <div className="text-lg font-semibold">Sign In with google</div>
    </div>
  );
}

export default GoogleSignin;
